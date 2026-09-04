import api from "./api";
import type { Habitation } from "../types/habitation";

export const getHabitations = async (): Promise<Habitation[]> => {
  const response = await api.get("/habitations");
  return response.data.data;
};

export const getHabitation = async (id: string): Promise<Habitation> => {
  const response = await api.get(`/habitations/${id}`);
  return response.data.data;
};

export const createHabitation = async (data: Partial<Habitation>): Promise<Habitation> => {
  const response = await api.post("/habitations", data);
  return response.data.data;
};
