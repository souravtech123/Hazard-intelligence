import { prisma } from "../../config/database";
import { SEED_HABITATIONS, SEED_RELOCATION_SITES } from "../../data/seed";

export const reportService = {
  async getAllReports() {
    try {
      const dbReports = await prisma.habitation.findMany({
        where: { riskLevel: { in: ["CRITICAL", "VERY_HIGH", "HIGH"] } },
      });
      if (dbReports.length > 0) {
        return dbReports.map((h) => ({
          id: `rep-${h.id}`,
          title: `Disaster Relocation Report — ${h.name}`,
          generatedAt: new Date().toISOString(),
          summary: `High disaster vulnerability detected in ${h.name} (${h.riskLevel} risk level). Evacuation and relocation planning recommended.`,
          riskScore: h.riskScore,
          highRiskHabitations: 1,
          recommendedRelocations: 2,
        }));
      }
    } catch {
      // DB offline
    }

    return SEED_HABITATIONS.filter((h) =>
      ["CRITICAL", "VERY_HIGH", "HIGH"].includes(h.riskLevel)
    ).map((h) => ({
      id: `rep-${h.id}`,
      title: `Disaster Risk & Relocation Assessment — ${h.name}`,
      generatedAt: new Date().toISOString(),
      summary: `Critical risk detected in ${h.name} (${h.riskLevel} risk level, score ${h.riskScore}). Total affected population: ${h.population.toLocaleString()}. Immediate resettlement to Ormanjhi Safe Highland Zone recommended.`,
      riskScore: h.riskScore,
      highRiskHabitations: 1,
      recommendedRelocations: 2,
    }));
  },

  async generateReport(habitationId: string) {
    let habitation: any = null;

    try {
      habitation = await prisma.habitation.findUnique({
        where: { id: habitationId },
        include: { district: true },
      });
    } catch {
      habitation = SEED_HABITATIONS.find((h) => h.id === habitationId) ?? null;
    }

    if (!habitation) {
      // Fallback to first critical habitation
      habitation = SEED_HABITATIONS[0];
    }

    const sites = SEED_RELOCATION_SITES.slice(0, 3).map((site, index) => ({
      rank: index + 1,
      site: {
        id: site.id,
        name: site.name,
        latitude: site.latitude,
        longitude: site.longitude,
      },
      suitabilityScore: site.suitabilityScore,
      availableCapacity: site.availableCapacity,
      recommendedPopulation: Math.min(habitation.population, site.availableCapacity),
      reason: `Elevated safe zone in Ranchi district with ${site.availableCapacity} available capacity and high accessibility.`,
    }));

    return {
      reportType: "RELOCATION_ASSESSMENT",
      generatedAt: new Date(),
      habitation: {
        id: habitation.id,
        name: habitation.name,
        district: habitation.district?.name ?? "Ranchi",
        state: habitation.district?.state ?? "Jharkhand",
        population: habitation.population,
        vulnerablePopulation: {
          children: habitation.children ?? Math.round(habitation.population * 0.3),
          elderly: habitation.elderly ?? Math.round(habitation.population * 0.1),
          disabled: habitation.disabled ?? Math.round(habitation.population * 0.05),
        },
        location: {
          latitude: habitation.latitude,
          longitude: habitation.longitude,
        },
      },
      riskAssessment: {
        overallScore: habitation.riskScore,
        riskLevel: habitation.riskLevel,
        floodRisk: habitation.floodRisk,
        landslideRisk: habitation.landslideRisk,
        historicalRisk: habitation.historicalRisk,
        exposure: habitation.exposure,
      },
      relocationPriority: {
        level: habitation.relocationPriority ?? "IMMEDIATE",
      },
      recommendations: sites,
    };
  },
};