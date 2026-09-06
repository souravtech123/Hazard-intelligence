import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHabitation } from "../../services/habitation.api";
import { getRelocationSites } from "../../services/relocation.api";
import type { Habitation } from "../../types/habitation";
import type { RelocationSite } from "../../types/relocation";
import { AlertTriangle, ShieldAlert, ArrowLeft, ArrowUpRight, Users, CheckCircle2, Edit } from "lucide-react";

const LEVEL_COLORS: Record<string, string> = {
  CRITICAL: "#ef4444",
  VERY_HIGH: "#f97316",
  HIGH: "#f59e0b",
  MODERATE: "#eab308",
  LOW: "#10b981",
};

function DarkRiskBar({ score }: { score: number }) {
  const color =
    score >= 85 ? "#ef4444"
    : score >= 70 ? "#f97316"
    : score >= 50 ? "#f59e0b"
    : "#10b981";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2.5 rounded-full bg-gray-950 border border-gray-800 overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="w-10 text-right font-mono text-xs font-bold" style={{ color }}>
        {score.toFixed(0)}%
      </span>
    </div>
  );
}

const HabitationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [habitation, setHabitation] = useState<Habitation | null>(null);
  const [sites, setSites] = useState<RelocationSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getHabitation(id), getRelocationSites()])
      .then(([hab, relocs]) => {
        setHabitation(hab);
        setSites([...relocs].sort((a, b) => b.suitabilityScore - a.suitabilityScore));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-12 text-center text-gray-400 font-semibold">Loading habitation profile...</div>;
  if (!habitation) return <div className="p-12 text-center text-red-400 font-semibold">Habitation profile not found.</div>;

  const levelColor = LEVEL_COLORS[(habitation as any).riskLevel ?? "LOW"] ?? "#6b7280";
  const isHighRisk = ["CRITICAL", "VERY_HIGH", "HIGH"].includes((habitation as any).riskLevel);

  const factors = [
    { label: "Flood Inundation Risk", value: (habitation as any).floodRisk ?? 0 },
    { label: "Landslide Slope Risk", value: (habitation as any).landslideRisk ?? 0 },
    { label: "Historical Disaster Risk", value: (habitation as any).historicalRisk ?? 0 },
    { label: "Physical Terrain Exposure", value: (habitation as any).exposure ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Back Link & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <Link to="/dashboard/habitations" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-2">
            <ArrowLeft size={14} />
            <span>Back to Habitations Directory</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">{habitation.name}</h1>
          <p className="text-xs text-gray-400 mt-1">
            Registered Coordinates: <span className="font-mono text-gray-300">{habitation.latitude}° N, {habitation.longitude}° E</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/dashboard/habitations/${habitation.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-xs font-bold text-white transition-all shadow-lg"
          >
            <Edit size={14} className="text-gray-400" />
            Edit Data
          </Link>
          <div
            className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg"
            style={{ background: levelColor }}
          >
            {(habitation as any).riskLevel} RISK
          </div>
        </div>
      </div>

      {/* Immediate Evacuation Alert Banner */}
      {(habitation as any).relocationPriority === "IMMEDIATE" && (
        <div className="rounded-2xl border-2 border-red-500/80 bg-red-950/40 p-5 flex items-start gap-4 backdrop-blur-md shadow-2xl animate-pulse">
          <div className="p-3 rounded-xl bg-red-600/30 text-red-400 border border-red-500/40 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-400">Immediate Evacuation Priority Triggered</h3>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Subarnarekha basin inundation models indicate severe flood/landslide risk. Total <b className="text-white">{habitation.population.toLocaleString()}</b> residents require immediate evacuation to designated safe highland relocation sites.
            </p>
          </div>
        </div>
      )}

      {/* Main Grid - Score & Factors */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Score Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Overall Hazard Index</h2>
          <div className="flex items-baseline gap-3">
            <span className="text-6xl font-black text-white tracking-tight" style={{ color: levelColor }}>
              {((habitation as any).riskScore ?? 0).toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-gray-500">/ 100</span>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-gray-950/80 border border-gray-800 text-xs">
            <span className="text-gray-400">Evacuation Priority:</span>{" "}
            <b className="text-white">{(habitation as any).relocationPriority ?? "MONITOR"}</b>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Risk Factor Breakdown</h2>
          <div className="space-y-4">
            {factors.map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{label}</span>
                  <span className="font-mono text-gray-200">{value.toFixed(1)}%</span>
                </div>
                <DarkRiskBar score={value} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Demographics Group */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Vulnerable Demographics Breakdown</h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">Total Population: {habitation.population.toLocaleString()}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Children (0-12 yrs)", val: (habitation as any).children ?? 0, icon: "👶", color: "text-amber-400" },
            { label: "Elderly Population", val: (habitation as any).elderly ?? 0, icon: "👴", color: "text-orange-400" },
            { label: "Differently Abled", val: (habitation as any).disabled ?? 0, icon: "♿", color: "text-red-400" },
          ].map((d, i) => (
            <div key={i} className="rounded-xl bg-gray-950/80 border border-gray-800 p-4 text-center">
              <span className="text-2xl">{d.icon}</span>
              <p className={`text-2xl font-black mt-2 tabular-nums ${d.color}`}>{d.val.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{d.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Safe Relocation Sites */}
      {isHighRisk && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-gray-800 bg-gray-950/80 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recommended Safe Highland Relocation Sites</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by suitability score and land availability in Ranchi district.</p>
            </div>
            <Link to="/dashboard/relocation" className="text-xs text-emerald-400 hover:text-emerald-300 font-bold">
              View All Sites →
            </Link>
          </div>

          <div className="divide-y divide-gray-800/60">
            {sites.slice(0, 3).map((site, index) => (
              <div key={site.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-4 hover:bg-gray-800/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-sm flex items-center justify-center shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{site.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Capacity: <b className="text-emerald-400">{site.availableCapacity.toLocaleString()} people</b> · Suitability Match: <b className="text-white">{site.suitabilityScore.toFixed(1)}%</b>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/dashboard/relocation/${site.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 transition-all shrink-0"
                >
                  <span>Select & Allocate</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitationDetail;
