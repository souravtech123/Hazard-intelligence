import api from "./api";
import type { RelocationSite } from "../types/relocation";

export const getRecommendations = async (habitationId: string): Promise<RelocationSite[]> => {
  const response = await api.get(`/recommendations/${habitationId}`);
  return response.data.data;
};

export const saveRecommendations = async (habitationId: string) => {
  const response = await api.post(`/recommendations/${habitationId}/save`);
  return response.data.data;
};
