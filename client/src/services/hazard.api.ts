import api from "./api";
import type { Hazard } from "../types/hazard";

export const getHazards = async (): Promise<
  Hazard[]
> => {
  const response = await api.get("/hazards");

  return response.data.data;
};

export const getHazard = async (
  id: string
): Promise<Hazard> => {
  const response = await api.get(
    `/hazards/${id}`
  );

  return response.data.data;
};