import { useHazards } from "../../hooks/useHazard";
import DisasterMap from "../../components/map/DisasterMap";

const Hazards = () => {
  const { hazards, loading, error } = useHazards();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hazard Monitoring</h1>
        <p className="mt-1 text-sm text-gray-500">
          Geospatial hazard mapping and real-time alerts.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Active Hazards</p>
          <p className="mt-1 text-2xl font-bold text-red-600">
            {loading ? "..." : hazards.length || 3}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Highest Threat Category</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">Flash Flood</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500">Monitored Districts</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">4</p>
        </div>
      </div>

      <DisasterMap />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Hazards;
