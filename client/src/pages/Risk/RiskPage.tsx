import RiskScoreCard from "../../components/risk/RiskScoreCard";
import RiskFactors from "../../components/risk/RiskFactors";
import RiskBreakdown from "../../components/risk/RiskBreakdown";
import { ShieldAlert } from "lucide-react";

const RiskPage = () => {
  const sampleFactors = [
    { name: "Flood Inundation Index (Subarnarekha Basin)", value: 88, weight: 40 },
    { name: "Landslide Slope Susceptibility (Tatisilwai)", value: 76, weight: 25 },
    { name: "Historical Disaster Frequency Log", value: 70, weight: 20 },
    { name: "Structural Terrain Exposure", value: 62, weight: 15 },
  ];

  const sampleBreakdown = [
    { category: "Environmental Exposure", score: 85, contribution: 40 },
    { category: "Socioeconomic Vulnerability", score: 72, contribution: 30 },
    { category: "Infrastructure Resilience Deficit", score: 64, contribution: 30 },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-800 pb-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-2">
          <ShieldAlert size={14} />
          <span>Multi-Criteria Evaluation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Risk Assessment & Factor Evaluation
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Multi-variable vulnerability formula breakdown combining environmental, GIS elevation, and population metrics.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RiskScoreCard score={82} level="VERY_HIGH" />
          <RiskBreakdown items={sampleBreakdown} />
        </div>

        <div>
          <RiskFactors factors={sampleFactors} />
        </div>
      </div>
    </div>
  );
};

export default RiskPage;
