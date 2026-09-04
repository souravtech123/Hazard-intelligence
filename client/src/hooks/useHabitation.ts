import { useEffect, useState } from "react";
import { getHabitations } from "../services/habitation.api";
import type { Habitation } from "../types/habitation";

export const useHabitations = () => {
  const [habitations, setHabitations] = useState<Habitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabitations = async () => {
      try {
        setLoading(true);
        const data = await getHabitations();
        setHabitations(data);
      } catch (err) {
        setError("Failed to load habitations");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitations();
  }, []);

  return { habitations, loading, error };
};
