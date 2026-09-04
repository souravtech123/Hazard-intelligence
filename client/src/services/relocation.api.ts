import api from "./api";
import type { RelocationSite } from "../types/relocation";

export const getRelocationSites = async (): Promise<RelocationSite[]> => {
  const response = await api.get("/relocation");
  return response.data.data;
};

export const getRelocationSite = async (id: string): Promise<RelocationSite> => {
  const response = await api.get(`/relocation/${id}`);
  return response.data.data;
};

export const allocateHabitation = async (habitationId: string, siteId: string) => {
  const response = await api.post("/relocation/allocate", { habitationId, siteId });
  return response.data.data;
};
