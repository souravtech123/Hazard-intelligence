import { useEffect, useState } from "react";
import DisasterMap from "../../components/map/DisasterMap";
import RiskScoreCard from "../../components/risk/RiskScoreCard";
import { getHabitations } from "../../services/habitation.api";
import { getRelocationSites } from "../../services/relocation.api";
import type { Habitation } from "../../types/habitation";
import type { RelocationSite } from "../../types/relocation";
import { ShieldAlert, Home, MapPin, Users, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [habitations, setHabitations] = useState<Habitation[]>([]);
  const [sites, setSites] = useState<RelocationSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getHabitations(), getRelocationSites()])
      .then(([habs, relocs]) => {
        setHabitations(habs);
        setSites(relocs);
      })
      .finally(() => setLoading(false));
  }, []);

  const criticalHabs = habitations.filter(
    (h) => h.riskLevel === "CRITICAL" || h.riskLevel === "VERY_HIGH"
  );
  const totalPopulation = habitations.reduce((sum, h) => sum + h.population, 0);
  const totalRelocationCapacity = sites.reduce(
    (sum, s) => sum + (s.availableCapacity || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Command Center • Active Monitoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Jharkhand Hazard & Relocation Intelligence
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Real-time GIS hazard tracking, risk scoring, and safe resettlement intelligence for Ranchi, Khunti, and Ramgarh districts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard/scenario"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600 transition-all"
          >
            <span>Run Disaster Simulation</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RiskScoreCard score={88} level="CRITICAL" />

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Habitations
            </p>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Home size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tabular-nums tracking-tight">
              {loading ? "..." : habitations.length}
            </span>
            <span className="text-xs text-gray-400">Settlements</span>
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            Total Pop: <b className="text-gray-200">{totalPopulation.toLocaleString()}</b>
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              High Risk Areas
            </p>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-400 tabular-nums tracking-tight">
              {loading ? "..." : criticalHabs.length}
            </span>
            <span className="text-xs text-red-400/80 font-bold">Critical / Very High</span>
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            Immediate relocation priority
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Relocation Capacity
            </p>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MapPin size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-400 tabular-nums tracking-tight">
              {loading ? "..." : totalRelocationCapacity.toLocaleString()}
            </span>
            <span className="text-xs text-gray-400">capacity</span>
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            Across <b className="text-gray-200">{sites.length} safe highland sites</b>
          </p>
        </div>
      </div>

      {/* Main Map View */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Regional GIS Hazard & Relocation Map
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">Center: Ranchi (23.38° N, 85.32° E)</span>
        </div>
        <DisasterMap />
      </div>

      {/* Critical Threat Ticker Table */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 shadow-xl overflow-hidden backdrop-blur-sm">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" />
            <h3 className="text-sm font-bold text-white">Critical Priority Habitations</h3>
          </div>
          <Link to="/dashboard/habitations" className="text-xs text-red-400 hover:text-red-300 font-semibold">
            View All Habitations →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="bg-gray-950/80 text-gray-400 uppercase font-semibold border-b border-gray-800">
              <tr>
                <th className="px-6 py-3">Habitation</th>
                <th className="px-6 py-3">Population</th>
                <th className="px-6 py-3 text-center">Risk Score</th>
                <th className="px-6 py-3 text-center">Severity</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {criticalHabs.slice(0, 4).map((hab) => (
                <tr key={hab.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-white">{hab.name}</td>
                  <td className="px-6 py-3.5 tabular-nums">{hab.population.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-center font-mono font-bold text-red-400">
                    {hab.riskScore?.toFixed(1)}
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                      {hab.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <Link
                      to={`/dashboard/habitations/${hab.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-red-600/20 border border-red-500/30 px-3 py-1 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition-all"
                    >
                      Relocate →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
