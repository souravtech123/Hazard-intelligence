import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import {
  MapPin,
  PlusCircle,
  ShieldAlert,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Calculator,
} from "lucide-react";

const AddLocationPage = () => {
  const navigate = useNavigate();

  const [locationType, setLocationType] = useState<"HABITATION" | "RELOCATION_SITE">("HABITATION");
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState<number>(23.3800);
  const [longitude, setLongitude] = useState<number>(85.3400);
  const [population, setPopulation] = useState<number>(3500);

  // Environmental Risk Parameters for Habitations
  const [floodRisk, setFloodRisk] = useState<number>(85);
  const [landslideRisk, setLandslideRisk] = useState<number>(45);
  const [historicalRisk, setHistoricalRisk] = useState<number>(75);
  const [exposure, setExposure] = useState<number>(80);

  // Infrastructure Parameters for Relocation Sites
  const [availableLand, setAvailableLand] = useState<number>(48.5);
  const [housingCapacity, setHousingCapacity] = useState<number>(1800);
  const [waterCapacity, setWaterCapacity] = useState<number>(9000);
  const [healthcareCapacity, setHealthcareCapacity] = useState<number>(8000);
  const [roadAccessibility, setRoadAccessibility] = useState<number>(82);

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Live Auto-Calculation for Habitation Risk Score & Classification
  const liveCalculation = useMemo(() => {
    const score = Math.round(
      Math.min(
        100,
        Math.max(
          0,
          floodRisk * 0.4 +
            landslideRisk * 0.25 +
            historicalRisk * 0.2 +
            exposure * 0.15
        )
      )
    );

    const level =
      score >= 85 ? "CRITICAL"
      : score >= 70 ? "VERY_HIGH"
      : score >= 50 ? "HIGH"
      : score >= 30 ? "MODERATE"
      : "LOW";

    const priority =
      score >= 85 ? "IMMEDIATE"
      : score >= 70 ? "HIGH"
      : "MONITOR";

    // Suitability Score for Relocation Sites
    const suitabilityScore = Math.round(
      Math.min(
        100,
        Math.max(
          0,
          roadAccessibility * 0.4 +
            (100 - (100 - exposure)) * 0.4 +
            Math.min(availableLand * 0.5, 20)
        )
      )
    );

    return { score, level, priority, suitabilityScore };
  }, [floodRisk, landslideRisk, historicalRisk, exposure, roadAccessibility, availableLand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSubmitting(true);
    setSuccessMsg(null);

    try {
      if (locationType === "HABITATION") {
        await api.post("/habitations", {
          name,
          latitude,
          longitude,
          population,
          children: Math.round(population * 0.3),
          elderly: Math.round(population * 0.1),
          disabled: Math.round(population * 0.05),
          floodRisk,
          landslideRisk,
          historicalRisk,
          exposure,
          roadAccessibility,
        });
        setSuccessMsg(`Habitation "${name}" added & risk score (${liveCalculation.score}/100) calculated!`);
      } else {
        await api.post("/relocation", {
          name,
          latitude,
          longitude,
          availableLand,
          capacity: population,
          maxPopulation: population,
          housingCapacity,
          waterCapacity,
          healthcareCapacity,
          roadAccessibility,
          hazardRisk: 8.0,
        });
        setSuccessMsg(`Relocation Site "${name}" registered with ${liveCalculation.suitabilityScore}% suitability match!`);
      }

      setTimeout(() => {
        navigate(locationType === "HABITATION" ? "/dashboard/habitations" : "/dashboard/relocation");
      }, 1800);
    } catch (err) {
      console.error("Failed to add location", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 mb-2">
            <PlusCircle size={14} />
            <span>Admin Data Entry & Automatic Risk Calculator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Add New Location & Compute Risk Score
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Register new settlements or safe highland relocation sites in Ranchi district. Risk scores and suitability ratings are automatically calculated in real-time.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="rounded-2xl border border-emerald-800 bg-emerald-950/80 p-4 text-emerald-400 text-xs font-bold flex items-center justify-between shadow-2xl animate-pulse">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
          <Link to="/dashboard" className="text-white bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded-lg text-xs font-bold">
            View Live on GIS Map →
          </Link>
        </div>
      )}

      {/* Main Grid: Form + Live Calculator Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
          {/* Location Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Select Location Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLocationType("HABITATION")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  locationType === "HABITATION"
                    ? "bg-red-950/80 text-red-400 border-red-800 shadow-md shadow-red-900/30"
                    : "bg-gray-950 text-gray-400 border-gray-800 hover:text-white"
                }`}
              >
                <ShieldAlert size={16} />
                <span>Risk Settlement (Habitation)</span>
              </button>

              <button
                type="button"
                onClick={() => setLocationType("RELOCATION_SITE")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  locationType === "RELOCATION_SITE"
                    ? "bg-emerald-950/80 text-emerald-400 border-emerald-800 shadow-md shadow-emerald-900/30"
                    : "bg-gray-950 text-gray-400 border-gray-800 hover:text-white"
                }`}
              >
                <Building2 size={16} />
                <span>Safe Relocation Site</span>
              </button>
            </div>
          </div>

          {/* Name & Coordinates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Location Name
              </label>
              <input
                type="text"
                required
                placeholder={locationType === "HABITATION" ? "e.g. Ranchi Ring Road Settlement" : "e.g. Ormanjhi Safe Highland Zone"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Latitude (° N)
              </label>
              <input
                type="number"
                step="0.0001"
                required
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Longitude (° E)
              </label>
              <input
                type="number"
                step="0.0001"
                required
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Population / Capacity */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                {locationType === "HABITATION" ? "Total Resident Population" : "Max Shelter Capacity"}
              </label>
              <input
                type="number"
                required
                value={population}
                onChange={(e) => setPopulation(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                Available Land Area (Hectares)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={availableLand}
                onChange={(e) => setAvailableLand(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-2.5 text-xs text-white focus:border-red-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Environmental Hazard Sliders */}
          <div className="space-y-4 border-t border-gray-800 pt-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <Calculator size={14} />
              <span>Multi-Criteria Environmental Factors</span>
            </h3>

            <div>
              <div className="flex justify-between text-xs text-gray-300 font-semibold mb-1">
                <span>Monsoon Flood Risk</span>
                <span className="font-mono text-red-400">{floodRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={floodRisk}
                onChange={(e) => setFloodRisk(Number(e.target.value))}
                className="w-full accent-red-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-300 font-semibold mb-1">
                <span>Landslide Slope Instability</span>
                <span className="font-mono text-orange-400">{landslideRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={landslideRisk}
                onChange={(e) => setLandslideRisk(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-300 font-semibold mb-1">
                <span>Historical Disaster Frequency</span>
                <span className="font-mono text-amber-400">{historicalRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={historicalRisk}
                onChange={(e) => setHistoricalRisk(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-300 font-semibold mb-1">
                <span>Structural Terrain Exposure</span>
                <span className="font-mono text-blue-400">{exposure}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={exposure}
                onChange={(e) => setExposure(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-3.5 text-xs font-bold text-white shadow-xl shadow-red-900/40 disabled:opacity-50 transition-all cursor-pointer"
          >
            {submitting ? "Computing & Saving Location..." : `Save ${locationType === "HABITATION" ? "Habitation" : "Relocation Site"} to System →`}
          </button>
        </form>

        {/* Live Automatic Risk Score & Suitability Calculator Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm sticky top-20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-gray-800 pb-3 mb-4">
              <Activity size={16} />
              <span>Real-time Risk Calculator</span>
            </div>

            {locationType === "HABITATION" ? (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Calculated Risk Score</p>
                  <p className="text-5xl font-black text-white font-mono mt-1 tabular-nums">
                    {liveCalculation.score}
                    <span className="text-xs text-gray-500 font-normal"> / 100</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Classified Risk Level:</span>
                    <b className={liveCalculation.score >= 85 ? "text-red-400 font-bold" : liveCalculation.score >= 70 ? "text-orange-400" : "text-emerald-400"}>
                      {liveCalculation.level}
                    </b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Evacuation Priority:</span>
                    <b className={liveCalculation.priority === "IMMEDIATE" ? "text-red-400" : "text-emerald-400"}>
                      {liveCalculation.priority}
                    </b>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 leading-relaxed font-mono bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
                  Formula Applied:<br />
                  <span className="text-gray-300">
                    ({floodRisk} × 0.40) + ({landslideRisk} × 0.25) + ({historicalRisk} × 0.20) + ({exposure} × 0.15)
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase">Calculated Suitability Match</p>
                  <p className="text-5xl font-black text-emerald-400 font-mono mt-1 tabular-nums">
                    {liveCalculation.suitabilityScore}%
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Safe Land Area:</span>
                    <b className="text-white font-mono">{availableLand} ha</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shelter Capacity:</span>
                    <b className="text-emerald-400 font-mono">{population.toLocaleString()}</b>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationPage;
