import api from "./api";
import type {
  RiskAssessment,
} from "../types/risk";

export const getRiskAssessment = async (
  habitationId: string
): Promise<RiskAssessment> => {
  const response = await api.get(
    `/risk/${habitationId}`
  );

  return response.data.data;
};