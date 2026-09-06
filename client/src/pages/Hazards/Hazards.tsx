import { useHazards } from "../../hooks/useHazard";
import DisasterMap from "../../components/map/DisasterMap";
import { AlertTriangle, ShieldAlert, Waves, Mountain, Wind, Radio } from "lucide-react";

const Hazards = () => {
  const { hazards, loading, error } = useHazards();

  const hazardCards = [
    { title: "Active Hazards Tracked", count: loading ? "..." : hazards.length || 4, desc: "Ranchi & Khunti Basins", icon: AlertTriangle, color: "text-red-400 border-red-500/30 bg-red-500/10" },
    { title: "Primary Threat Mode", count: "Flash Flood", desc: "Subarnarekha River Basin", icon: Waves, color: "text-blue-400 border-blue-500/30 bg-blue-500/10" },
    { title: "Slope Instability Zone", count: "High Incline", desc: "Tatisilwai Highway Cut", icon: Mountain, color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 mb-2">
            <Radio size={14} className="animate-pulse" />
            <span>Real-time Geospatial Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hazard Event Monitoring & Map Layer
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Geospatial tracking of riverine flood plains, cloudburst zones, and highway cut slope instabilities.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {hazardCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
              <div className="flex justify-between items-start">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.title}</p>
                <div className={`p-2 rounded-xl border ${card.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-black text-white mt-3 tracking-tight">{card.count}</p>
              <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Map View */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Geospatial Hazard Layer Overlay
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">Active Layers: Flood (Red) & Landslide (Purple)</span>
        </div>
        <DisasterMap />
      </div>

      {error && <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-400 text-sm">{error}</div>}
    </div>
  );
};

export default Hazards;
