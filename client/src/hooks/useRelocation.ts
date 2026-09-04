import { useEffect, useState } from "react";
import { getRelocationSites } from "../services/relocation.api";
import type { RelocationSite } from "../types/relocation";

export const useRelocation = () => {
  const [sites, setSites] = useState<RelocationSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const data = await getRelocationSites();
        setSites(data);
      } catch (err) {
        setError("Failed to load relocation sites");
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  return { sites, loading, error };
};
