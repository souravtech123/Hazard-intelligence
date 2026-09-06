import { useRelocation } from "../../hooks/useRelocation";
import SiteComparison from "../../components/relocation/SiteComparison";
import { MapPin, Building2, ShieldCheck } from "lucide-react";

const Relocation = () => {
  const { sites, loading, error } = useRelocation();

  const totalCapacity = sites.reduce((s, item) => s + (item.availableCapacity || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
            <Building2 size={14} />
            <span>Highland Safe Resettlement Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Relocation Sites & Shelter Capacities
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Elevated highland sites across Ranchi district evaluated for land availability, healthcare, water, and road accessibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900 px-4 py-2 text-right">
            <p className="text-[10px] text-gray-400 font-semibold uppercase">Total Shelter Capacity</p>
            <p className="text-lg font-black text-emerald-400 tabular-nums">{totalCapacity.toLocaleString()} people</p>
          </div>
        </div>
      </div>

      {loading && <div className="p-12 text-center text-gray-400 font-semibold">Loading relocation sites...</div>}
      {error && <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-400 text-sm">{error}</div>}

      {!loading && !error && (
        <>
          {sites.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
              No relocation sites registered.
            </div>
          ) : (
            <SiteComparison sites={sites} />
          )}
        </>
      )}
    </div>
  );
};

export default Relocation;
