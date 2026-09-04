export interface RiskInput {
  floodRisk: number;
  landslideRisk: number;
  historicalRisk: number;
  exposure: number;
}

export type RiskLevel =
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "VERY_HIGH"
  | "CRITICAL";

export function calculateRiskScore(
  input: RiskInput
): number {
  const score =
    input.floodRisk * 0.40 +
    input.landslideRisk * 0.25 +
    input.historicalRisk * 0.20 +
    input.exposure * 0.15;

  return Math.round(
    Math.min(Math.max(score, 0), 100)
  );
}

export function classifyRisk(
  score: number
): RiskLevel {
  if (score <= 30) {
    return "LOW";
  }

  if (score <= 50) {
    return "MODERATE";
  }

  if (score <= 70) {
    return "HIGH";
  }

  if (score <= 85) {
    return "VERY_HIGH";
  }

  return "CRITICAL";
}