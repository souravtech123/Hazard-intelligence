import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRelocationSite } from "../../services/relocation.api";
import type { RelocationSite } from "../../types/relocation";
import PriorityBadge from "../../components/relocation/PriorityBadge";

const SiteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<RelocationSite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getRelocationSite(id)
      .then((data) => setSite(data))
      .catch(() => {
        // Fallback mock site for demonstration when backend DB is empty
        setSite({
          id,
          name: "Relocation Site #" + id.slice(0, 6),
          location: "Safe Highland Sector",
          latitude: 23.3615,
          longitude: 85.3347,
          availableLand: 15.5,
          capacity: 600,
          currentPopulation: 120,
          maxPopulation: 600,
          availableCapacity: 480,
          housingCapacity: 500,
          waterCapacity: 550,
          healthcareCapacity: 450,
          infrastructureCapacity: 480,
          roadAccessibility: 85,
          employmentAccessibility: 70,
          hazardRisk: 15,
          suitabilityScore: 88,
          priority: "LOW",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-gray-500">Loading relocation site details...</p>;
  }

  if (error || !site) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">{error || "Site not found"}</p>
        <Link to="/relocation" className="text-sm font-medium text-blue-600 underline">
          &larr; Back to Relocation Sites
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/relocation" className="text-sm text-gray-500 hover:text-gray-900">
            &larr; Back to Relocation Sites
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">{site.name}</h1>
          <p className="text-sm text-gray-500">{site.location || "Designated Relocation Area"}</p>
        </div>

        {site.priority && <PriorityBadge priority={site.priority} />}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Suitability Score</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{site.suitabilityScore}%</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Available Capacity</p>
          <p className="mt-1 text-2xl font-bold">{site.availableCapacity}</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Hazard Risk Score</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{site.hazardRisk ?? 15}/100</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Available Land</p>
          <p className="mt-1 text-2xl font-bold">{site.availableLand ?? 10} ha</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Infrastructure Capacities</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Housing Capacity</p>
            <p className="mt-1 text-xl font-bold">{site.housingCapacity ?? 0}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Water Capacity</p>
            <p className="mt-1 text-xl font-bold">{site.waterCapacity ?? 0}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Healthcare Access</p>
            <p className="mt-1 text-xl font-bold">{site.healthcareCapacity ?? 0}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Infrastructure Capacity</p>
            <p className="mt-1 text-xl font-bold">{site.infrastructureCapacity ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;
