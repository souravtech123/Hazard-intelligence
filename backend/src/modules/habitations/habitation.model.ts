export interface CreateHabitationInput {
  name: string;
  districtId: string;

  population: number;
  children?: number;
  elderly?: number;
  disabled?: number;

  povertyIndex?: number;
  roadAccessibility?: number;
  healthcareAccess?: number;

  floodRisk?: number;
  landslideRisk?: number;
  historicalRisk?: number;
  exposure?: number;

  latitude: number;
  longitude: number;
}

export interface UpdateHabitationInput {
  name?: string;

  population?: number;
  children?: number;
  elderly?: number;
  disabled?: number;

  povertyIndex?: number;
  roadAccessibility?: number;
  healthcareAccess?: number;

  floodRisk?: number;
  landslideRisk?: number;
  historicalRisk?: number;
  exposure?: number;

  latitude?: number;
  longitude?: number;
}