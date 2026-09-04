export interface RiskFactor {
  name: string;
  value: number;
  weight?: number;
}

export interface RiskBreakdownItem {
  category: string;
  score: number;
  contribution: number;
}

export interface RiskAssessment {
  id?: string;
  habitationId?: string;
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  factors: RiskFactor[];
  breakdown?: RiskBreakdownItem[];
}
