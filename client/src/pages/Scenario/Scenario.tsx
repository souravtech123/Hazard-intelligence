import { useState } from "react";
import api from "../../services/api";

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disaster Scenario Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">
          Simulate environmental hazard scenarios across Jharkhand habitations and calculate evacuation capacity requirements.
        </p>
      </div>

      {/* Control Panel */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Simulation Control Parameters</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Hazard Type</label>
            <select
              value={hazardType}
              onChange={(e) => setHazardType(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-gray-900 focus:outline-none"
            >
              <option value="Flood">Monsoon Riverine Flood (Subarnarekha Basin)</option>
              <option value="Landslide">Highway Cut Slope Breakdown</option>
              <option value="Flash Flood">Cloudburst Flash Flood</option>
              <option value="Cyclone">Tropical Storm & Wind Surge</option>
              <option value="Drought">Agricultural Drought Spell</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
              <label>Simulated Severity Level</label>
              <span className="font-bold text-gray-900">{severity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="mt-4 w-full accent-gray-900 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Moderate (10%)</span>
              <span>Severe (50%)</span>
              <span>Catastrophic (100%)</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunScenario}
          disabled={loading}
          className="mt-6 rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {loading ? "Running Simulation…" : "▶ Run Scenario Simulation"}
        </button>
      </div>

      {/* Simulation Results */}
      {result && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">Impacted Habitations</p>
              <p className="text-3xl font-bold mt-1 text-red-600">
                {result.summary.impactedHabitations}{" "}
                <span className="text-sm font-normal text-gray-400">/ {result.summary.totalHabitations}</span>
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">Displaced Population</p>
              <p className="text-3xl font-bold mt-1 tabular-nums">{result.summary.affectedPopulation.toLocaleString()}</p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">Relocation Shelter Capacity</p>
              <p className="text-3xl font-bold mt-1 text-green-700 tabular-nums">
                {result.summary.totalRelocationCapacity.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-gray-500">Capacity Deficit</p>
              <p className={`text-3xl font-bold mt-1 tabular-nums ${result.summary.capacityDeficit > 0 ? "text-red-600" : "text-gray-900"}`}>
                {result.summary.capacityDeficit.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-blue-900 mb-2">System Recommendations & Evacuation Action Plan</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span>📌</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impacted Habitations Breakdown Table */}
          <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Simulated Impact by Habitation</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-3 text-left">Habitation</th>
                  <th className="px-5 py-3 text-right">Population</th>
                  <th className="px-5 py-3 text-center">Baseline Risk</th>
                  <th className="px-5 py-3 text-center">Simulated Risk</th>
                  <th className="px-5 py-3 text-center">Evacuation Status</th>
                </tr>
              </thead>
              <tbody>
                {result.impactedAreas.map((area) => (
                  <tr key={area.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium">{area.name}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{area.population.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center tabular-nums text-gray-500">{area.currentRisk}%</td>
                    <td className="px-5 py-3 text-center tabular-nums font-bold text-red-600">{area.simulatedRisk}%</td>
                    <td className="px-5 py-3 text-center">
                      {area.requiresImmediateRelocation ? (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                          🚨 IMMEDIATE EVACUATION
                        </span>
                      ) : (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
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
      )}
    </div>
  );
};

export default Scenario;