import { prisma } from "../../config/database";
import {
  calculateSuitabilityScore,
  generateRecommendationReason,
} from "./recommendation.engine";

export const recommendationService = {
  async recommend(habitationId: string) {
    const habitation = await prisma.habitation.findUnique({
      where: {
        id: habitationId,
      },
    });

    if (!habitation) {
      throw new Error("Habitation not found");
    }

    const sites = await prisma.relocationSite.findMany({
      where: {
        districtId: habitation.districtId,
        availableCapacity: {
          gt: 0,
        },
      },
    });

    const recommendations = sites
      .map((site) => {
        const score = calculateSuitabilityScore({
          population: habitation.population,
          site,
        });

        const reason = generateRecommendationReason(site);

        return {
          habitationId,
          siteId: site.id,
          score,
          reason,
          recommendedPopulation: Math.min(
            habitation.population,
            site.availableCapacity
          ),
        };
      })
      .sort((a, b) => b.score - a.score)
      .map((recommendation, index) => ({
        ...recommendation,
        rank: index + 1,
      }));

    return recommendations;
  },

  async saveRecommendations(habitationId: string) {
    const recommendations =
      await this.recommend(habitationId);

    await prisma.recommendation.deleteMany({
      where: {
        habitationId,
      },
    });

    if (recommendations.length === 0) {
      return [];
    }

    await prisma.recommendation.createMany({
      data: recommendations,
    });

    return recommendations;
  },

  async getSavedRecommendations(habitationId: string) {
    return prisma.recommendation.findMany({
      where: {
        habitationId,
      },
      include: {
        site: true,
      },
      orderBy: {
        rank: "asc",
      },
    });
  },
};