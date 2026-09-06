interface RiskScoreCardProps {
  score: number;
  level: "LOW" | "MEDIUM" | "MODERATE" | "HIGH" | "VERY_HIGH" | "CRITICAL";
}

const RiskScoreCard = ({ score, level }: RiskScoreCardProps) => {
  const levelStyles = {
    LOW: "text-emerald-400 bg-emerald-950/80 border-emerald-800/80",
    MEDIUM: "text-amber-400 bg-amber-950/80 border-amber-800/80",
    MODERATE: "text-amber-400 bg-amber-950/80 border-amber-800/80",
    HIGH: "text-orange-400 bg-orange-950/80 border-orange-800/80",
    VERY_HIGH: "text-red-400 bg-red-950/80 border-red-800/80",
    CRITICAL: "text-red-500 bg-red-950/90 border-red-800",
  };

  const levelColor =
    score >= 85 ? "#ef4444"
    : score >= 70 ? "#f97316"
    : score >= 50 ? "#f59e0b"
    : "#10b981";

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex justify-between items-start">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Regional Risk Index
        </p>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${levelStyles[level] ?? levelStyles.HIGH}`}
        >
          {level}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-black text-white tabular-nums tracking-tight">
          {score}
        </span>
        <span className="text-sm text-gray-500 font-medium">/ 100</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-950 border border-gray-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
            background: levelColor,
          }}
        />
      </div>
    </div>
  );
};

export default RiskScoreCard;