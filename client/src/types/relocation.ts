export interface RelocationSite {
  id: string;
  name: string;
  location?: string;
  districtId?: string;
  district?: {
    id: string;
    name: string;
    state: string;
  };
  latitude: number;
  longitude: number;
  availableLand?: number;
  capacity?: number;
  currentPopulation?: number;
  maxPopulation?: number;
  housingCapacity?: number;
  waterCapacity?: number;
  healthcareCapacity?: number;
  infrastructureCapacity?: number;
  roadAccessibility?: number;
  employmentAccessibility?: number;
  hazardRisk?: number;
  availableCapacity: number;
  suitabilityScore: number;
  distance?: number;
  priority?: "HIGH" | "MEDIUM" | "LOW";
  createdAt?: string;
  updatedAt?: string;
}
