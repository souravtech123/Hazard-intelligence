import { useState } from "react";
import { Link } from "react-router-dom";
import { useHabitations } from "../../hooks/useHabitations";
import { Search, Filter, ShieldAlert, ArrowUpDown, ChevronRight } from "lucide-react";

const LEVEL_BADGES: Record<string, string> = {
  CRITICAL: "bg-red-950 text-red-400 border-red-800",
  VERY_HIGH: "bg-orange-950 text-orange-400 border-orange-800",
  HIGH: "bg-amber-950 text-amber-400 border-amber-800",
  MODERATE: "bg-yellow-950 text-yellow-400 border-yellow-800",
  LOW: "bg-emerald-950 text-emerald-400 border-emerald-800",
};

const PRIORITY_BADGES: Record<string, string> = {
  IMMEDIATE: "text-red-400 font-bold",
  HIGH: "text-orange-400 font-semibold",
  MONITOR: "text-emerald-400 font-medium",
};

const Habitations = () => {
  const { habitations, loading, error } = useHabitations();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("ALL");

  const filtered = habitations
    .filter((hab) => {
      const matchSearch = hab.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLevel = filterLevel === "ALL" || hab.riskLevel === filterLevel;
      return matchSearch && matchLevel;
    })
    .sort((a, b) => (b.riskScore ?? 0) - (a.riskScore ?? 0));

  const stats = {
    total: habitations.length,
    totalPop: habitations.reduce((s, h) => s + h.population, 0),
    critical: habitations.filter((h) => h.riskLevel === "CRITICAL" || h.riskLevel === "VERY_HIGH").length,
    immediate: habitations.filter((h) => (h as any).relocationPriority === "IMMEDIATE").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 mb-2">
            <ShieldAlert size={14} />
            <span>Habitation Vulnerability Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Jharkhand Habitations & Risk Assessment
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-world settlements ranked by multi-variable hazard indices. Select any row to inspect demographics and trigger relocation.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Settlements", val: stats.total, color: "text-white" },
          { label: "Total Population", val: stats.totalPop.toLocaleString(), color: "text-gray-200" },
          { label: "High Risk Habitations", val: stats.critical, color: "text-red-400" },
          { label: "Immediate Evacuations", val: stats.immediate, color: "text-orange-400" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-gray-800 bg-gray-900/90 p-4 backdrop-blur-sm shadow-xl">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-black mt-1 tabular-nums ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between rounded-2xl border border-gray-800 bg-gray-900/90 p-4 shadow-xl backdrop-blur-sm">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search habitation by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-gray-950 pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter size={14} className="text-gray-400 shrink-0" />
          {["ALL", "CRITICAL", "VERY_HIGH", "HIGH", "LOW"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                filterLevel === lvl
                  ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                  : "bg-gray-950 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="text-center py-12 text-gray-400 font-semibold">Loading habitations data...</div>}
      {error && <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-400 text-sm font-semibold">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-300">
              <thead className="bg-gray-950/90 text-gray-400 uppercase font-semibold border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4">Settlement Name</th>
                  <th className="px-6 py-4 text-right">Population</th>
                  <th className="px-6 py-4 text-center">Risk Score</th>
                  <th className="px-6 py-4 text-center">Risk Level</th>
                  <th className="px-6 py-4 text-center">Evacuation Priority</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filtered.map((hab) => (
                  <tr key={hab.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white text-sm">{hab.name}</td>
                    <td className="px-6 py-4 text-right tabular-nums text-gray-200 font-medium">
                      {hab.population.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-3">
                        <div className="w-24 h-2 rounded-full bg-gray-950 border border-gray-800 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${hab.riskScore ?? 0}%`,
                              background:
                                (hab.riskScore ?? 0) >= 85 ? "#ef4444"
                                : (hab.riskScore ?? 0) >= 70 ? "#f97316"
                                : (hab.riskScore ?? 0) >= 50 ? "#f59e0b"
                                : "#10b981",
                            }}
                          />
                        </div>
                        <span className="font-mono font-bold text-white tabular-nums">
                          {(hab.riskScore ?? 0).toFixed(0)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${LEVEL_BADGES[hab.riskLevel ?? "LOW"]}`}>
                        {hab.riskLevel}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-center text-xs ${PRIORITY_BADGES[(hab as any).relocationPriority ?? "MONITOR"]}`}>
                      {(hab as any).relocationPriority ?? "MONITOR"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/dashboard/habitations/${hab.id}`}
                        className="inline-flex items-center gap-1 rounded-xl bg-gray-800 hover:bg-red-600 text-gray-200 hover:text-white px-3.5 py-1.5 text-xs font-bold transition-all border border-gray-700 hover:border-red-500 shadow-sm"
                      >
                        <span>Inspect</span>
                        <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium">
                      No habitations match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Habitations;
