import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHabitation } from "../../services/habitation.api";
import { getRelocationSites } from "../../services/relocation.api";
import type { Habitation } from "../../types/habitation";
import type { RelocationSite } from "../../types/relocation";

const LEVEL_COLORS: Record<string, string> = {
  CRITICAL: "#7f1d1d",
  VERY_HIGH: "#dc2626",
  HIGH: "#ea580c",
  MODERATE: "#ca8a04",
  LOW: "#16a34a",
};

function RiskBar({ score }: { score: number }) {
  const color =
    score >= 85 ? "#7f1d1d"
    : score >= 70 ? "#dc2626"
    : score >= 50 ? "#ea580c"
    : score >= 30 ? "#ca8a04"
    : "#16a34a";

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="w-10 text-right font-mono text-sm font-bold" style={{ color }}>
        {score.toFixed(0)}
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
        // Sort sites by suitability score descending
        setSites([...relocs].sort((a, b) => b.suitabilityScore - a.suitabilityScore));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Loading details…</p>;
  if (!habitation) return <p className="p-6 text-red-600">Habitation not found.</p>;

  const levelColor = LEVEL_COLORS[(habitation as any).riskLevel ?? "LOW"] ?? "#6b7280";
  const isHighRisk = ["CRITICAL", "VERY_HIGH", "HIGH"].includes((habitation as any).riskLevel);

  const factors = [
    { label: "Flood Risk", value: (habitation as any).floodRisk ?? 0 },
    { label: "Landslide Risk", value: (habitation as any).landslideRisk ?? 0 },
    { label: "Historical Risk", value: (habitation as any).historicalRisk ?? 0 },
    { label: "Exposure", value: (habitation as any).exposure ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link to="/habitations" className="text-sm text-gray-400 hover:text-gray-600">
            ← Back to Habitations
          </Link>
          <h1 className="text-2xl font-bold mt-1">{habitation.name}</h1>
          <p className="text-sm text-gray-500">Population: {habitation.population.toLocaleString()} people</p>
        </div>
        <div
          className="rounded-xl px-4 py-2 text-white text-sm font-bold"
          style={{ background: levelColor }}
        >
          {(habitation as any).riskLevel} RISK
        </div>
      </div>

      {/* Alert banner for immediate relocation */}
      {(habitation as any).relocationPriority === "IMMEDIATE" && (
        <div className="rounded-xl border-2 border-red-400 bg-red-50 p-4 flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <p className="font-bold text-red-800">Immediate Relocation Required</p>
            <p className="text-sm text-red-700 mt-0.5">
              This habitation is at critical risk. {habitation.population.toLocaleString()} residents need to be evacuated
              and resettled at a safe relocation site as soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Risk Score + Factors */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Overall Risk Score</h2>
          <div className="text-5xl font-black mb-2" style={{ color: levelColor }}>
            {((habitation as any).riskScore ?? 0).toFixed(1)}
            <span className="text-lg font-normal text-gray-400"> / 100</span>
          </div>
          <p className="text-sm text-gray-500">
            {(habitation as any).riskLevel} — {(habitation as any).relocationPriority ?? "MONITOR"}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold mb-4">Risk Factor Breakdown</h2>
          <div className="space-y-3">
            {factors.map(({ label, value }) => (
              <div key={label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{label}</span>
                  <span>{value.toFixed(1)}%</span>
                </div>
                <RiskBar score={value} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerable Population */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold mb-4">Vulnerable Groups</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Children", value: (habitation as any).children ?? 0, icon: "👶" },
            { label: "Elderly", value: (habitation as any).elderly ?? 0, icon: "👴" },
            { label: "Differently Abled", value: (habitation as any).disabled ?? 0, icon: "♿" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="text-center">
              <div className="text-2xl">{icon}</div>
              <div className="text-xl font-bold mt-1">{value.toLocaleString()}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Relocation Sites */}
      {isHighRisk && (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="font-semibold">Recommended Relocation Sites</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Sites ranked by suitability score. All sites are in safer elevated areas of Ranchi district.
            </p>
          </div>
          <div className="divide-y">
            {sites.slice(0, 3).map((site, index) => (
              <div key={site.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-bold flex items-center justify-center text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{site.name}</p>
                    <p className="text-xs text-gray-500">
                      Capacity: {site.availableCapacity.toLocaleString()} people
                      · Suitability: {site.suitabilityScore.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Link
                  to={`/relocation/${site.id}`}
                  className="rounded-lg bg-green-700 px-4 py-2 text-xs text-white font-semibold hover:bg-green-800 transition-colors"
                >
                  Select Site →
                </Link>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t">
            <Link to="/relocation" className="text-sm text-blue-600 hover:underline">
              View all relocation sites →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitationDetail;
