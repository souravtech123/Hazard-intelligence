interface SiteForRecommendation {
  id: string;

  availableCapacity: number;
  waterCapacity: number;
  healthcareCapacity: number;

  roadAccessibility: number;
  employmentAccessibility: number;

  hazardRisk: number;
}

interface RecommendationInput {
  population: number;
  site: SiteForRecommendation;
}

export function calculateSuitabilityScore(
  input: RecommendationInput
): number {
  const { population, site } = input;

  const safetyScore = 100 - site.hazardRisk;

  const capacityScore =
    Math.min(
      (site.availableCapacity / population) * 100,
      100
    );

  const waterScore =
    Math.min(
      (site.waterCapacity / population) * 100,
      100
    );

  const healthcareScore =
    Math.min(
      (site.healthcareCapacity / population) * 100,
      100
    );

  const connectivityScore =
    (site.roadAccessibility +
      site.employmentAccessibility) / 2;

  const score =
    safetyScore * 0.30 +
    capacityScore * 0.25 +
    waterScore * 0.10 +
    healthcareScore * 0.10 +
    connectivityScore * 0.15 +
    (100 - site.hazardRisk) * 0.10;

  return Math.round(Math.min(Math.max(score, 0), 100));
}

export function generateRecommendationReason(
  site: SiteForRecommendation
): string {
  const reasons: string[] = [];

  if (site.hazardRisk < 30) {
    reasons.push("low hazard risk");
  }

  if (site.availableCapacity > 0) {
    reasons.push("sufficient available capacity");
  }

  if (site.waterCapacity > 0) {
    reasons.push("water capacity available");
  }

  if (site.healthcareCapacity > 0) {
    reasons.push("healthcare capacity available");
  }

  if (site.roadAccessibility >= 70) {
    reasons.push("good road accessibility");
  }

  if (site.employmentAccessibility >= 70) {
    reasons.push("good employment accessibility");
  }

  if (reasons.length === 0) {
    return "Site requires further assessment.";
  }

  return `Recommended because of ${reasons.join(", ")}.`;
}