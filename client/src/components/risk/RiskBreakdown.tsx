interface RiskBreakdownItem {
  category: string;
  score: number;
  contribution: number;
}

interface RiskBreakdownProps {
  items: RiskBreakdownItem[];
}

const RiskBreakdown = ({ items }: RiskBreakdownProps) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
        Disaster Impact Breakdown
      </h3>

      <div className="divide-y divide-gray-800/80">
        {items.map((item) => (
          <div key={item.category} className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-xs font-bold text-white">{item.category}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Model Weight: <b className="text-gray-300">{item.contribution}%</b>
              </p>
            </div>

            <div className="text-right font-mono">
              <p className="text-lg font-black text-amber-400">{item.score}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskBreakdown;