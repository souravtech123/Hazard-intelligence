export interface Hazard {
  id: string;
  districtId: string;
  district?: {
    id: string;
    name: string;
    state: string;
  };
  type: string;
  severity: number;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
}
