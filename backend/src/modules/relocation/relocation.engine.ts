export type RelocationPriority =
  | "IMMEDIATE"
  | "SHORT TERM"
  | "MEDIUM TERM"
  | "MONITOR";


/**
 * Input required to calculate
 * the available capacity of a relocation site.
 */
export interface CapacityInput {
  housingCapacity: number;
  waterCapacity: number;
  healthcareCapacity: number;
  infrastructureCapacity: number;
}


/**
 * Calculates the maximum population that
 * a relocation site can safely accommodate
 * based on its limiting capacity.
 */
export function calculateAvailableCapacity(
  input: CapacityInput
): number {
  return Math.min(
    input.housingCapacity,
    input.waterCapacity,
    input.healthcareCapacity,
    input.infrastructureCapacity
  );
}


/**
 * Input used for determining
 * relocation priority.
 */
export interface PriorityInput {
  riskScore: number;
  vulnerabilityScore: number;
}


/**
 * Determines relocation priority.
 *
 * Higher risk and vulnerability
 * result in higher relocation urgency.
 */
export function calculateRelocationPriority(
  input: PriorityInput
): RelocationPriority {
  const { riskScore, vulnerabilityScore } = input;

  const priorityScore =
    riskScore * 0.6 +
    vulnerabilityScore * 0.4;

  if (priorityScore >= 85) {
    return "IMMEDIATE";
  }

  if (priorityScore >= 70) {
    return "SHORT TERM";
  }

  if (priorityScore >= 50) {
    return "MEDIUM TERM";
  }

  return "MONITOR";
}