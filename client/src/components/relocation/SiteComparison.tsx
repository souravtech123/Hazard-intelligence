import SiteCard from "./SiteCard";
import type { RelocationSite } from "../../types/relocation";

interface SiteComparisonProps {
  sites: RelocationSite[];
}

const SiteComparison = ({ sites }: SiteComparisonProps) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {sites.map((site) => (
        <SiteCard
          key={site.id}
          id={site.id}
          name={site.name}
          location={site.location ?? `${site.latitude}, ${site.longitude}`}
          capacity={site.availableCapacity}
          distance={site.distance ?? 0}
          priority={site.priority ?? "LOW"}
          suitabilityScore={site.suitabilityScore}
        />
      ))}
    </div>
  );
};

export default SiteComparison;
