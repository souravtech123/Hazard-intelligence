import { Link } from "react-router-dom";
import { useHabitations } from "../../hooks/useHabitations";

const LEVEL_COLORS: Record<string, string> = {
  CRITICAL: "bg-red-950 text-white",
  VERY_HIGH: "bg-red-600 text-white",
  HIGH: "bg-orange-500 text-white",
  MODERATE: "bg-yellow-400 text-gray-900",
  LOW: "bg-green-500 text-white",
};

const PRIORITY_COLORS: Record<string, string> = {
  IMMEDIATE: "text-red-700 font-bold",
  HIGH: "text-orange-600 font-semibold",
  MONITOR: "text-green-700",
};

const Habitations = () => {
  const { habitations, loading, error } = useHabitations();

  const sorted = [...habitations].sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));

  const stats = {
    critical: habitations.filter((h) => h.riskLevel === "CRITICAL").length,
    veryHigh: habitations.filter((h) => h.riskLevel === "VERY_HIGH").length,
    immediate: habitations.filter((h) => (h as any).relocationPriority === "IMMEDIATE").length,
    total: habitations.length,
    totalPop: habitations.reduce((s, h) => s + h.population, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Habitations — Risk Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Jharkhand habitations ranked by disaster risk. Click any row to view details and relocation recommendations.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Habitations", value: stats.total, cls: "border-gray-200" },
          { label: "Total Population", value: stats.totalPop.toLocaleString(), cls: "border-gray-200" },
          { label: "Critical Risk", value: stats.critical, cls: "border-red-300 bg-red-50" },
          { label: "Immediate Relocation", value: stats.immediate, cls: "border-orange-300 bg-orange-50" },
        ].map(({ label, value, cls }) => (
          <div key={label} className={`rounded-xl border ${cls} p-4`}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {loading && <p className="text-gray-500">Loading habitations…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left">Habitation</th>
                <th className="px-5 py-3 text-right">Population</th>
                <th className="px-5 py-3 text-center">Risk Score</th>
                <th className="px-5 py-3 text-center">Risk Level</th>
                <th className="px-5 py-3 text-center">Priority</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((hab) => (
                <tr key={hab.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium">{hab.name}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{hab.population.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${hab.riskScore ?? 0}%`,
                            background:
                              (hab.riskScore ?? 0) >= 85 ? "#7f1d1d"
                              : (hab.riskScore ?? 0) >= 70 ? "#dc2626"
                              : (hab.riskScore ?? 0) >= 50 ? "#ea580c"
                              : "#16a34a",
                          }}
                        />
                      </div>
                      <span className="tabular-nums font-mono">{(hab.riskScore ?? 0).toFixed(0)}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_COLORS[hab.riskLevel ?? "LOW"] ?? "bg-gray-100"}`}>
                      {hab.riskLevel}
                    </span>
                  </td>
                  <td className={`px-5 py-3 text-center text-xs ${PRIORITY_COLORS[(hab as any).relocationPriority ?? "MONITOR"]}`}>
                    {(hab as any).relocationPriority ?? "MONITOR"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Link
                      to={`/habitations/${hab.id}`}
                      className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white hover:bg-gray-700 transition-colors"
                    >
                      Details →
                    </Link>
                  </td>
                </tr>
              ))}
              {habitations.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">No habitation data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Habitations;
