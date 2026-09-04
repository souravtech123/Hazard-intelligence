interface RiskScoreCardProps {
  score: number;
  level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const RiskScoreCard = ({
  score,
  level,
}: RiskScoreCardProps) => {
  const levelStyles = {
    LOW: "text-green-600",
    MEDIUM: "text-yellow-600",
    HIGH: "text-orange-600",
    CRITICAL: "text-red-600",
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        Overall Risk Score
      </p>

      <div className="mt-3 flex items-end gap-3">
        <span className="text-4xl font-bold text-gray-900">
          {score}
        </span>

        <span
          className={`mb-1 text-sm font-semibold ${levelStyles[level]}`}
        >
          {level}
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gray-900 transition-all"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
};

export default RiskScoreCard;