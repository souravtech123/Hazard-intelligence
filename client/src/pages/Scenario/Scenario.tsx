import { useState } from "react";
import api from "../../services/api";
import { GitBranch, AlertTriangle, Play, ShieldAlert, ArrowRight, Activity, CheckCircle2 } from "lucide-react";

interface ScenarioResult {
  hazardType: string;
  severity: number;
  simulatedAt: string;
  summary: {
    totalHabitations: number;
    impactedHabitations: number;
    affectedPopulation: number;
    totalRelocationCapacity: number;
    capacityDeficit: number;
  };
  impactedAreas: Array<{
    id: string;
    name: string;
    currentRisk: number;
    simulatedRisk: number;
    population: number;
    requiresImmediateRelocation: boolean;
  }>;
  recommendations: string[];
}

const Scenario = () => {
  const [hazardType, setHazardType] = useState("Flood");
  const [severity, setSeverity] = useState(75);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);

  const handleRunScenario = async () => {
    try {
      setLoading(true);
      const response = await api.post("/scenarios/run", { hazardType, severity });
      setResult(response.data.data);
    } catch (err) {
      console.error("Failed to run scenario", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 mb-2">
            <GitBranch size={14} />
            <span>AI Predictive Scenario Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Disaster Scenario Simulation & Evacuation Forecast
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Simulate monsoon flooding, flash flood surges, and landslide events across Jharkhand habitations to forecast evacuation capacity deficits.
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Simulation Parameters</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Hazard Event Mode</label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-gray-950 p-3 text-xs text-white focus:border-red-500 focus:outline-none"
            >
              <option value="Flood">Monsoon Riverine Flood (Subarnarekha Basin)</option>
              <option value="Landslide">Highway Cut Slope Breakdown</option>
              <option value="Flash Flood">Cloudburst Flash Flood</option>
              <option value="Cyclone">Tropical Storm & Wind Surge</option>
              <option value="Drought">Agricultural Drought Spell</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-gray-300 mb-2">
              <label>Simulated Hazard Severity Level</label>
              <span className="font-mono font-bold text-red-400 text-sm">{severity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer mt-2"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1.5 font-mono">
              <span>Moderate (10%)</span>
              <span>Severe (50%)</span>
              <span>Catastrophic (100%)</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunScenario}
          disabled={loading}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-6 py-3 text-xs font-bold text-white shadow-xl shadow-red-900/40 disabled:opacity-50 transition-all cursor-pointer"
        >
          <Play size={14} />
          <span>{loading ? "Running Simulation..." : "Execute Simulation Model"}</span>
        </button>
      </div>

      {/* Simulation Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Impacted Habitations</p>
              <p className="text-3xl font-black mt-2 text-red-400 tabular-nums">
                {result.summary.impactedHabitations}{" "}
                <span className="text-xs font-normal text-gray-500">/ {result.summary.totalHabitations}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Displaced Population</p>
              <p className="text-3xl font-black mt-2 text-white tabular-nums">{result.summary.affectedPopulation.toLocaleString()}</p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Relocation Shelter Capacity</p>
              <p className="text-3xl font-black mt-2 text-emerald-400 tabular-nums">
                {result.summary.totalRelocationCapacity.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Capacity Deficit</p>
              <p className={`text-3xl font-black mt-2 tabular-nums ${result.summary.capacityDeficit > 0 ? "text-red-500" : "text-emerald-400"}`}>
                {result.summary.capacityDeficit.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="rounded-2xl border border-blue-800/80 bg-blue-950/30 p-5 backdrop-blur-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
              <Activity size={16} />
              <span>Simulated Action Plan & System Recommendations</span>
            </h3>
            <ul className="space-y-2 text-xs text-blue-200">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact Table */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-gray-800 bg-gray-950/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Simulated Impact by Settlement</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-300">
                <thead className="bg-gray-950 text-gray-400 uppercase font-semibold border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-3">Settlement</th>
                    <th className="px-6 py-3 text-right">Population</th>
                    <th className="px-6 py-3 text-center">Baseline Risk</th>
                    <th className="px-6 py-3 text-center">Simulated Risk</th>
                    <th className="px-6 py-3 text-center">Evacuation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {result.impactedAreas.map((area) => (
                    <tr key={area.id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-white">{area.name}</td>
                      <td className="px-6 py-3.5 text-right tabular-nums text-gray-200">{area.population.toLocaleString()}</td>
                      <td className="px-6 py-3.5 text-center tabular-nums text-gray-400">{area.currentRisk}%</td>
                      <td className="px-6 py-3.5 text-center tabular-nums font-bold text-red-400">{area.simulatedRisk}%</td>
                      <td className="px-6 py-3.5 text-center">
                        {area.requiresImmediateRelocation ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                            🚨 IMMEDIATE EVACUATION
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                            ✅ STABLE / MONITOR
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scenario;