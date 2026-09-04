import RiskScoreCard from "../../components/risk/RiskScoreCard";
import RiskFactors from "../../components/risk/RiskFactors";
import RiskBreakdown from "../../components/risk/RiskBreakdown";

const RiskPage = () => {
  const sampleFactors = [
    { name: "Flood Inundation Index", value: 82, weight: 40 },
    { name: "Landslide Susceptibility", value: 64, weight: 25 },
    { name: "Historical Disaster Frequency", value: 70, weight: 20 },
    { name: "Structural Vulnerability", value: 55, weight: 15 },
  ];

  const sampleBreakdown = [
    { category: "Environmental Exposure", score: 80, contribution: 40 },
    { category: "Socioeconomic Vulnerability", score: 68, contribution: 30 },
    { category: "Infrastructure Resilience", score: 54, contribution: 30 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Risk Assessment</h1>
        <p className="mt-1 text-sm text-gray-500">
          Multi-criteria disaster vulnerability evaluation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <RiskScoreCard score={72} level="HIGH" />
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
