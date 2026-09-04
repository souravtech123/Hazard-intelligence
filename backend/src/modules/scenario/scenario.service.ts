import { prisma } from "../../config/database";
import { SEED_HABITATIONS, SEED_RELOCATION_SITES } from "../../data/seed";

export interface ScenarioInput {
  hazardType: string;
  severity: number;
}

export interface ScenarioResult {
  hazardType: string;
  severity: number;
  simulatedAt: Date;
  summary: {
    totalHabitations: number;
    impactedHabitations: number;
    affectedPopulation: number;
    totalRelocationCapacity: number;
    capacityDeficit: number;
  };
  impactedAreas: Array<{
    id: string;
    name: string;
    currentRisk: number;
    simulatedRisk: number;
    population: number;
    requiresImmediateRelocation: boolean;
  }>;
  recommendations: string[];
}

export const scenarioService = {
  async runScenario(input: ScenarioInput): Promise<ScenarioResult> {
    const { hazardType, severity } = input;

    let habitations: any[] = [];
    let sites: any[] = [];

    try {
      habitations = await prisma.habitation.findMany();
      sites = await prisma.relocationSite.findMany();
      if (habitations.length === 0) habitations = SEED_HABITATIONS;
      if (sites.length === 0) sites = SEED_RELOCATION_SITES;
    } catch {
      habitations = SEED_HABITATIONS;
      sites = SEED_RELOCATION_SITES;
    }

    const severityFactor = Math.min(Math.max(severity, 0), 100) / 100;

    let impactedPopulation = 0;
    const impactedAreas = habitations.map((h) => {
      const simulatedRisk = Math.min(
        100,
        Math.round(h.riskScore + (100 - h.riskScore) * severityFactor * 0.5)
      );
      const requiresImmediateRelocation = simulatedRisk >= 75;
      if (requiresImmediateRelocation) {
        impactedPopulation += h.population;
      }
      return {
        id: h.id,
        name: h.name,
        currentRisk: h.riskScore,
        simulatedRisk,
        population: h.population,
        requiresImmediateRelocation,
      };
    });

    const totalRelocationCapacity = sites.reduce(
      (sum, s) => sum + (s.availableCapacity || 0),
      0
    );

    const capacityDeficit = Math.max(0, impactedPopulation - totalRelocationCapacity);

    const recommendations: string[] = [];
    if (capacityDeficit > 0) {
      recommendations.push(
        `Immediate expansion of relocation sites needed in Jharkhand. Shortfall of ${capacityDeficit.toLocaleString()} capacity under ${severity}% ${hazardType} scenario.`
      );
    } else {
      recommendations.push(
        `Relocation sites (Ormanjhi, Khelari, Lapung) have sufficient total capacity (${totalRelocationCapacity.toLocaleString()}) for estimated displaced population (${impactedPopulation.toLocaleString()}).`
      );
    }

    recommendations.push(
      `Priority evacuation recommended for Subarnarekha River Basin (Nagri, Kanke, Namkum) to Ormanjhi Safe Highland Zone.`
    );

    return {
      hazardType,
      severity,
      simulatedAt: new Date(),
      summary: {
        totalHabitations: habitations.length,
        impactedHabitations: impactedAreas.filter((a) => a.requiresImmediateRelocation).length,
        affectedPopulation: impactedPopulation,
        totalRelocationCapacity,
        capacityDeficit,
      },
      impactedAreas,
      recommendations,
    };
  },
};
