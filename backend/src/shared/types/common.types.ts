export type ID = string;

export type Status =
  | "ACTIVE"
  | "INACTIVE";

export interface Coordinates {
  latitude: number;
  longitude: number;
}