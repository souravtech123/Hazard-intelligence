import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  RefreshCw,
  Users,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { getHabitation, updateHabitation } from "../../services/habitation.api";
import type { Habitation } from "../../types/habitation";

// ── Live Risk Calculator (same formula as backend risk.engine.ts) ──────────
function calcRisk(flood: number, landslide: number, historical: number, exposure: number) {
  return Math.min(100, Math.max(0, flood * 0.40 + landslide * 0.25 + historical * 0.20 + exposure * 0.15));
}
function classifyRisk(score: number): string {
  if (score <= 30) return "LOW";
  if (score <= 50) return "MODERATE";
  if (score <= 70) return "HIGH";
  if (score <= 85) return "VERY_HIGH";
  return "CRITICAL";
}
const LEVEL_COLOR: Record<string, string> = {
  LOW: "#10b981",
  MODERATE: "#eab308",
  HIGH: "#f59e0b",
  VERY_HIGH: "#f97316",
  CRITICAL: "#ef4444",
};

// ── Slider Component ──────────────────────────────────────────────────────────
function Slider({
  label,
  value,
  onChange,
  color = "#ef4444",
  note,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color?: string;
  note?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-gray-300">{label}</label>
        <span className="text-xs font-black font-mono" style={{ color }}>{value.toFixed(0)}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-700"
        style={{ accentColor: color }}
      />
      {note && <p className="text-[10px] text-gray-500">{note}</p>}
    </div>
  );
}

// ── Number Input ──────────────────────────────────────────────────────────────
function NumInput({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-400">{label}</label>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl bg-gray-950 border border-gray-700 text-white text-sm font-mono px-3 py-2 focus:outline-none focus:border-red-500 transition-colors"
      />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const EditLocationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [population, setPopulation] = useState(0);
  const [children, setChildren] = useState(0);
  const [elderly, setElderly] = useState(0);
  const [disabled, setDisabled] = useState(0);
  const [povertyIndex, setPovertyIndex] = useState(50);
  const [roadAccessibility, setRoadAccessibility] = useState(50);
  const [healthcareAccess, setHealthcareAccess] = useState(50);

  // Risk sliders
  const [floodRisk, setFloodRisk] = useState(50);
  const [landslideRisk, setLandslideRisk] = useState(50);
  const [historicalRisk, setHistoricalRisk] = useState(50);
  const [exposure, setExposure] = useState(50);

  // Live calculated score
  const liveScore = calcRisk(floodRisk, landslideRisk, historicalRisk, exposure);
  const liveLevel = classifyRisk(liveScore);
  const liveColor = LEVEL_COLOR[liveLevel];
  const liveRelocation =
    liveScore >= 85 ? "IMMEDIATE" : liveScore >= 70 ? "HIGH" : "MONITOR";

  // Pre-populate on load
  useEffect(() => {
    if (!id) return;
    getHabitation(id)
      .then((hab: any) => {
        setName(hab.name ?? "");
        setPopulation(hab.population ?? 0);
        setChildren(hab.children ?? 0);
        setElderly(hab.elderly ?? 0);
        setDisabled(hab.disabled ?? 0);
        setPovertyIndex(hab.povertyIndex ?? 50);
        setRoadAccessibility(hab.roadAccessibility ?? 50);
        setHealthcareAccess(hab.healthcareAccess ?? 50);
        setFloodRisk(hab.floodRisk ?? 50);
        setLandslideRisk(hab.landslideRisk ?? 50);
        setHistoricalRisk(hab.historicalRisk ?? 50);
        setExposure(hab.exposure ?? 50);
      })
      .catch(() => setError("Could not load habitation data."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      await updateHabitation(id, {
        name,
        population,
        children,
        elderly,
        disabled,
        povertyIndex,
        roadAccessibility,
        healthcareAccess,
        floodRisk,
        landslideRisk,
        historicalRisk,
        exposure,
      } as any);
      setSaved(true);
      setTimeout(() => navigate(`/dashboard/habitations/${id}`), 1800);
    } catch {
      setError("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 gap-3">
        <Loader2 className="animate-spin" size={20} />
        <span className="text-sm font-semibold">Loading habitation data...</span>
      </div>
    );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <Link
            to={`/dashboard/habitations/${id}`}
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft size={14} />
            Back to Habitation Profile
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Edit Habitation Data
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manually update population, demographics, and risk factors. Risk Score
            recalculates automatically.
          </p>
        </div>
        <div
          className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-lg shrink-0"
          style={{ background: liveColor }}
        >
          {liveLevel} RISK
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 px-5 py-4 text-emerald-400 font-semibold text-sm">
          <CheckCircle2 size={18} />
          Changes saved! Redirecting to habitation profile...
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-950/50 border border-red-500/40 px-5 py-4 text-red-400 font-semibold text-sm">
          <AlertTriangle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Details + Demographics ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic Info */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Basic Information
            </h2>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400">Habitation Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kanke Village"
                required
                className="w-full rounded-xl bg-gray-950 border border-gray-700 text-white text-sm px-3 py-2.5 focus:outline-none focus:border-red-500 transition-colors placeholder-gray-600"
              />
            </div>
          </div>

          {/* Demographics */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} className="text-amber-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Population &amp; Demographics
              </h2>
            </div>
            <p className="text-[11px] text-gray-500 mb-4">
              Update these values when census or field survey data changes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <NumInput label="Total Population" value={population} onChange={setPopulation} />
              <NumInput label="Children (0–12 yrs)" value={children} onChange={setChildren} />
              <NumInput label="Elderly Population" value={elderly} onChange={setElderly} />
              <NumInput label="Differently Abled" value={disabled} onChange={setDisabled} />
            </div>
          </div>

          {/* Socioeconomic */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Socioeconomic &amp; Accessibility Indicators
            </h2>
            <div className="space-y-5">
              <Slider
                label="Poverty Index"
                value={povertyIndex}
                onChange={setPovertyIndex}
                color="#f97316"
                note="Higher = more economically vulnerable"
              />
              <Slider
                label="Road Accessibility"
                value={roadAccessibility}
                onChange={setRoadAccessibility}
                color="#3b82f6"
                note="Higher = better road connectivity"
              />
              <Slider
                label="Healthcare Access"
                value={healthcareAccess}
                onChange={setHealthcareAccess}
                color="#8b5cf6"
                note="Higher = closer/better healthcare facility"
              />
            </div>
          </div>

          {/* Risk Factors */}
          <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Hazard Risk Factors
            </h2>
            <p className="text-[11px] text-gray-500 mb-5">
              Adjust based on updated IMD flood forecasts, ISRO DEM slope analysis, or field surveys.
            </p>
            <div className="space-y-6">
              <Slider
                label="Flood Inundation Risk (weight 40%)"
                value={floodRisk}
                onChange={setFloodRisk}
                color="#ef4444"
                note="Based on Subarnarekha river basin inundation models"
              />
              <Slider
                label="Landslide Slope Risk (weight 25%)"
                value={landslideRisk}
                onChange={setLandslideRisk}
                color="#f97316"
                note="Chota Nagpur Plateau slope instability index"
              />
              <Slider
                label="Historical Disaster Risk (weight 20%)"
                value={historicalRisk}
                onChange={setHistoricalRisk}
                color="#eab308"
                note="NDMA/JSDMA recorded disaster frequency"
              />
              <Slider
                label="Physical Terrain Exposure (weight 15%)"
                value={exposure}
                onChange={setExposure}
                color="#6366f1"
                note="Elevation, slope, proximity to water bodies"
              />
            </div>
          </div>

        </div>

        {/* ── Right Column: Live Risk Preview + Submit ── */}
        <div className="space-y-6">

          {/* Live Risk Score */}
          <div
            className="rounded-2xl border p-6 shadow-2xl sticky top-6"
            style={{ borderColor: liveColor + "55", background: liveColor + "0a" }}
          >
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Live Risk Preview
            </h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-6xl font-black tracking-tight" style={{ color: liveColor }}>
                {liveScore.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 font-semibold">/ 100</span>
            </div>

            {/* Score bar */}
            <div className="h-3 rounded-full bg-gray-950 border border-gray-800 overflow-hidden mb-3">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${liveScore}%`, background: liveColor }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Level</span>
                <b className="font-black" style={{ color: liveColor }}>{liveLevel}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Evacuation Priority</span>
                <b className="text-white">{liveRelocation}</b>
              </div>
            </div>

            {/* Formula breakdown */}
            <div className="mt-5 p-3 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1.5 text-[10px] font-mono text-gray-400">
              <p className="text-gray-300 font-bold mb-1">Formula Breakdown</p>
              <p>Flood × 0.40 = <b className="text-white">{(floodRisk * 0.40).toFixed(1)}</b></p>
              <p>Landslide × 0.25 = <b className="text-white">{(landslideRisk * 0.25).toFixed(1)}</b></p>
              <p>Historical × 0.20 = <b className="text-white">{(historicalRisk * 0.20).toFixed(1)}</b></p>
              <p>Exposure × 0.15 = <b className="text-white">{(exposure * 0.15).toFixed(1)}</b></p>
              <hr className="border-gray-700 my-1" />
              <p className="text-white font-bold">Total = {liveScore.toFixed(1)}</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving || saved}
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-black text-white shadow-2xl transition-all"
            style={{ background: saving || saved ? "#374151" : "#dc2626" }}
          >
            {saving ? (
              <><Loader2 size={16} className="animate-spin" /> Saving Changes...</>
            ) : saved ? (
              <><CheckCircle2 size={16} /> Saved Successfully!</>
            ) : (
              <><Save size={16} /> Save Changes</>
            )}
          </button>

          <Link
            to={`/dashboard/habitations/${id}`}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-gray-700 text-xs font-bold text-gray-400 hover:text-white hover:border-gray-500 transition-all"
          >
            <RefreshCw size={13} />
            Discard &amp; Go Back
          </Link>

          {/* Info note */}
          <div className="rounded-xl bg-gray-900/60 border border-gray-800 p-4 text-[10px] text-gray-500 leading-relaxed">
            <b className="text-gray-300 block mb-1">What updates automatically:</b>
            Risk Score, Risk Level, and Evacuation Priority are recalculated on every save using the weighted formula above.
            <br /><br />
            <b className="text-gray-300 block mb-1">What needs manual update:</b>
            Population, demographics, poverty index, accessibility — update these after field surveys or census data changes.
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLocationPage;
