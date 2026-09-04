export interface Habitation {
  id: string;
  name: string;
  districtId?: string;
  district?: {
    id: string;
    name: string;
    state: string;
  };
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
  riskScore?: number;
  riskLevel?: string;
  relocationPriority?: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
  updatedAt?: string;
}
