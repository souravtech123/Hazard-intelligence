interface RiskFactor {
  name: string;
  value: number;
  weight?: number;
}

interface RiskFactorsProps {
  factors: RiskFactor[];
}

const RiskFactors = ({
  factors,
}: RiskFactorsProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Risk Factors
      </h3>

      <div className="mt-5 space-y-5">
        {factors.map((factor) => (
          <div key={factor.name}>
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                {factor.name}
              </span>

              <span className="text-sm font-semibold">
                {factor.value}
              </span>
            </div>

            <div className="h-2 rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-800"
                style={{
                  width: `${Math.min(
                    Math.max(factor.value, 0),
                    100
                  )}%`,
                }}
              />
            </div>

            {factor.weight !== undefined && (
              <p className="mt-1 text-xs text-gray-400">
                Weight: {factor.weight}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskFactors;