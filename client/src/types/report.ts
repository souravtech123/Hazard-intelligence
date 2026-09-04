export interface Report {
  id: string;
  title: string;
  generatedAt: string;
  summary: string;
  riskScore?: number;
  highRiskHabitations?: number;
  recommendedRelocations?: number;
}
