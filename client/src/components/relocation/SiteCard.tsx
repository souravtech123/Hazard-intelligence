import { Link } from "react-router-dom";
import { MapPin, Users, ArrowUpRight, ShieldCheck } from "lucide-react";

interface SiteCardProps {
  id: string;
  name: string;
  location: string;
  capacity: number;
  distance: number;
  priority: "HIGH" | "MEDIUM" | "LOW";
  suitabilityScore: number;
}

const SiteCard = ({
  id,
  name,
  location,
  capacity,
  distance,
  suitabilityScore,
}: SiteCardProps) => {
  return (
    <div className="group rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm hover:border-gray-700 transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
              {name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              <MapPin size={12} className="text-emerald-400 shrink-0" />
              <span>{location}</span>
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-1 text-[11px] font-bold text-emerald-400 shrink-0">
            <ShieldCheck size={12} />
            <span>{suitabilityScore.toFixed(0)}% Match</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5 p-3 rounded-xl bg-gray-950/80 border border-gray-800 text-xs">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Available Land</p>
            <p className="font-mono font-bold text-emerald-400 mt-0.5 tabular-nums">
              {capacity.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Distance</p>
            <p className="font-mono font-bold text-gray-200 mt-0.5 tabular-nums">
              {distance > 0 ? `${distance} km` : "Nearby"}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Suitability</p>
            <p className="font-mono font-bold text-white mt-0.5 tabular-nums">
              {suitabilityScore.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/dashboard/relocation/${id}`}
        className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 transition-all"
      >
        <span>Inspect & Allocate Site</span>
        <ArrowUpRight size={14} />
      </Link>
    </div>
  );
};

export default SiteCard;
