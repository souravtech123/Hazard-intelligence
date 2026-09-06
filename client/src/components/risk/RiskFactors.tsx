interface RiskFactor {
  name: string;
  value: number;
  weight?: number;
}

interface RiskFactorsProps {
  factors: RiskFactor[];
}

const RiskFactors = ({ factors }: RiskFactorsProps) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-5">
        Multi-Criteria Risk Factors
      </h3>

      <div className="space-y-5">
        {factors.map((factor) => {
          const color =
            factor.value >= 80 ? "#ef4444"
            : factor.value >= 65 ? "#f97316"
            : factor.value >= 50 ? "#f59e0b"
            : "#10b981";

          return (
            <div key={factor.name}>
              <div className="mb-1.5 flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-200">{factor.name}</span>
                <span className="font-mono font-bold" style={{ color }}>{factor.value}%</span>
              </div>

              <div className="h-2 rounded-full bg-gray-950 border border-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(Math.max(factor.value, 0), 100)}%`,
                    background: color,
                  }}
                />
              </div>

              {factor.weight !== undefined && (
                <p className="mt-1 text-[11px] text-gray-400">
                  Evaluated Weight: <b className="text-gray-300">{factor.weight}%</b>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskFactors;