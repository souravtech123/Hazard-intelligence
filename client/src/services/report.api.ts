import api from "./api";

export interface Report {
  id: string;
  title: string;
  generatedAt: string;
  summary: string;
  riskScore?: number;
  highRiskHabitations?: number;
  recommendedRelocations?: number;
}

export const getReports = async (): Promise<
  Report[]
> => {
  const response = await api.get("/reports");

  return response.data.data;
};

export const getReport = async (
  id: string
): Promise<Report> => {
  const response = await api.get(
    `/reports/${id}`
  );

  return response.data.data;
};

export const downloadReport = async (
  id: string
) => {
  const response = await api.get(
    `/reports/${id}/download`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};