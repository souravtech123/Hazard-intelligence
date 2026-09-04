export interface CreateRelocationSiteInput {
  name: string;
  districtId: string;

  latitude: number;
  longitude: number;

  availableLand: number;

  currentPopulation?: number;
  maxPopulation: number;

  housingCapacity: number;
  waterCapacity: number;
  healthcareCapacity: number;
  infrastructureCapacity: number;

  roadAccessibility?: number;
  employmentAccessibility?: number;

  hazardRisk?: number;
  availableCapacity?: number;
}

export interface UpdateRelocationSiteInput {
  name?: string;

  latitude?: number;
  longitude?: number;

  availableLand?: number;

  currentPopulation?: number;
  maxPopulation?: number;

  housingCapacity?: number;
  waterCapacity?: number;
  healthcareCapacity?: number;
  infrastructureCapacity?: number;

  roadAccessibility?: number;
  employmentAccessibility?: number;

  hazardRisk?: number;
  availableCapacity?: number;
}
