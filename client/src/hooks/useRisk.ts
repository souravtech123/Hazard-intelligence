import { useState } from "react";
import { getRiskAssessment } from "../services/risk.api";
import type { RiskAssessment } from "../types/risk";

export const useRisk = () => {
  const [risk, setRisk] = useState<RiskAssessment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRisk = async (habitationId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRiskAssessment(habitationId);
      setRisk(data);
    } catch (err) {
      setError("Failed to fetch risk assessment");
    } finally {
      setLoading(false);
    }
  };

  return { risk, loading, error, fetchRisk };
};
