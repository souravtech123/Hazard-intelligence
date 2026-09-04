import { prisma } from "../../config/database";
import { SEED_HABITATIONS } from "../../data/seed";
import { calculateRiskScore, classifyRisk } from "./risk.engine";

export const riskService = {
  async calculateForHabitation(habitationId: string) {
    let habitation: any = null;

    try {
      habitation = await prisma.habitation.findUnique({
        where: { id: habitationId },
      });
    } catch {
      habitation = SEED_HABITATIONS.find((h) => h.id === habitationId) ?? null;
    }

    if (!habitation) {
      throw new Error("Habitation not found");
    }

    const score = calculateRiskScore({
      floodRisk: habitation.floodRisk,
      landslideRisk: habitation.landslideRisk,
      historicalRisk: habitation.historicalRisk,
      exposure: habitation.exposure,
    });

    const riskLevel = classifyRisk(score);

    try {
      const updated = await prisma.habitation.update({
        where: { id: habitationId },
        data: { riskScore: score, riskLevel },
      });
      return { habitationId: updated.id, riskScore: score, riskLevel };
    } catch {
      // DB unavailable — return computed result
      return { habitationId: habitation.id, riskScore: score, riskLevel };
    }
  },

  async getRisk(habitationId: string) {
    try {
      const habitation = await prisma.habitation.findUnique({
        where: { id: habitationId },
        select: {
          id: true,
          name: true,
          riskScore: true,
          riskLevel: true,
          floodRisk: true,
          landslideRisk: true,
          historicalRisk: true,
          exposure: true,
        },
      });

      if (!habitation) throw new Error("Not found in DB");
      return habitation;
    } catch {
      const h = SEED_HABITATIONS.find((s) => s.id === habitationId);
      if (!h) throw new Error("Habitation not found");

      return {
        id: h.id,
        name: h.name,
        riskScore: h.riskScore,
        riskLevel: h.riskLevel,
        floodRisk: h.floodRisk,
        landslideRisk: h.landslideRisk,
        historicalRisk: h.historicalRisk,
        exposure: h.exposure,
        // Expanded factors for frontend RiskFactors component
        factors: [
          { name: "Flood Risk", score: h.floodRisk, weight: 0.35 },
          { name: "Landslide Risk", score: h.landslideRisk, weight: 0.30 },
          { name: "Historical Risk", score: h.historicalRisk, weight: 0.20 },
          { name: "Exposure", score: h.exposure, weight: 0.15 },
        ],
      };
    }
  },
};