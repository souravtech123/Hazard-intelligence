interface RiskBreakdownItem {
  category: string;
  score: number;
  contribution: number;
}

interface RiskBreakdownProps {
  items: RiskBreakdownItem[];
}

const RiskBreakdown = ({
  items,
}: RiskBreakdownProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">
        Risk Breakdown
      </h3>

      <div className="mt-5 divide-y">
        {items.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between py-4"
          >
            <div>
              <p className="font-medium text-gray-800">
                {item.category}
              </p>

              <p className="text-xs text-gray-500">
                Contribution: {item.contribution}%
              </p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold">
                {item.score}
              </p>

              <p className="text-xs text-gray-500">
                Score
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskBreakdown;