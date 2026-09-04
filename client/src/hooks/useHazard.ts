import { useEffect, useState } from "react";
import { getHazards } from "../services/hazard.api";
import type { Hazard } from "../types/hazard";

export const useHazards = () => {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHazards = async () => {
      try {
        setLoading(true);
        const data = await getHazards();
        setHazards(data);
      } catch (err) {
        setError("Failed to load hazards");
      } finally {
        setLoading(false);
      }
    };

    fetchHazards();
  }, []);

  return { hazards, loading, error };
};
