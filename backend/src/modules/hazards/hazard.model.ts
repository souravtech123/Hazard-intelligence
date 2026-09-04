export type HazardType =
  | "FLOOD"
  | "LANDSLIDE";

export interface CreateHazardInput {
  districtId: string;
  type: HazardType;
  severity: number;

  latitude?: number;
  longitude?: number;
}

export interface UpdateHazardInput {
  type?: HazardType;
  severity?: number;

  latitude?: number;
  longitude?: number;
}