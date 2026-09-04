import { Link } from "react-router-dom";
import PriorityBadge from "./PriorityBadge";

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
  priority,
  suitabilityScore,
}: SiteCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>

        <PriorityBadge priority={priority} />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div>
          <p className="text-xs text-gray-500">Capacity</p>
          <p className="font-semibold">{capacity}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Distance</p>
          <p className="font-semibold">{distance} km</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Suitability</p>
          <p className="font-semibold">{suitabilityScore}%</p>
        </div>
      </div>

      <Link
        to={`/relocation/${id}`}
        className="block w-full mt-5 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm text-white hover:bg-gray-800"
      >
        View Site
      </Link>
    </div>
  );
};

export default SiteCard;
