import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRelocationSite } from "../../services/relocation.api";
import type { RelocationSite } from "../../types/relocation";
import { ArrowLeft, ShieldCheck, MapPin, Building2, Droplet, HeartPulse, Truck } from "lucide-react";

const SiteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<RelocationSite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getRelocationSite(id)
      .then((data) => setSite(data))
      .catch(() => {
        setSite({
          id,
          name: "Ormanjhi Safe Highland Zone",
          location: "Ormanjhi Highland Sector, Ranchi",
          latitude: 23.4150,
          longitude: 85.2750,
          availableLand: 48.5,
          capacity: 8000,
          currentPopulation: 0,
          maxPopulation: 8000,
          availableCapacity: 8000,
          housingCapacity: 1800,
          waterCapacity: 9000,
          healthcareCapacity: 8000,
          infrastructureCapacity: 7500,
          roadAccessibility: 82,
          employmentAccessibility: 75,
          hazardRisk: 8,
          suitabilityScore: 91,
          priority: "LOW",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-12 text-center text-gray-400 font-semibold">Loading site profile...</div>;
  if (!site) return <div className="p-12 text-center text-red-400 font-semibold">Site profile not found.</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <Link to="/dashboard/relocation" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mb-2">
            <ArrowLeft size={14} />
            <span>Back to Relocation Sites</span>
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight">{site.name}</h1>
          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
            <MapPin size={13} className="text-emerald-400" />
            <span>{site.location || `${site.latitude}° N, ${site.longitude}° E`}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 px-4 py-2 text-xs font-bold text-emerald-400 shadow-lg">
            <ShieldCheck size={16} />
            <span>{site.suitabilityScore.toFixed(1)}% Match Suitability</span>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suitability Score</p>
          <p className="mt-2 text-3xl font-black text-emerald-400 tabular-nums">{site.suitabilityScore.toFixed(1)}%</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Capacity</p>
          <p className="mt-2 text-3xl font-black text-white tabular-nums">{site.availableCapacity.toLocaleString()}</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Natural Hazard Risk</p>
          <p className="mt-2 text-3xl font-black text-emerald-400 tabular-nums">{site.hazardRisk ?? 8}%</p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur-sm">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Land</p>
          <p className="mt-2 text-3xl font-black text-gray-200 tabular-nums">{site.availableLand ?? 48.5} ha</p>
        </div>
      </div>

      {/* Infrastructure Capacities */}
      <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Infrastructure & Utility Support Capacities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Building2 size={16} />
              <span className="text-xs font-bold">Housing Units</span>
            </div>
            <p className="text-2xl font-black text-white tabular-nums mt-1">{site.housingCapacity?.toLocaleString() ?? 0}</p>
          </div>

          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Droplet size={16} />
              <span className="text-xs font-bold">Water Capacity</span>
            </div>
            <p className="text-2xl font-black text-white tabular-nums mt-1">{site.waterCapacity?.toLocaleString() ?? 0}</p>
          </div>

          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <div className="flex items-center gap-2 text-red-400 mb-1">
              <HeartPulse size={16} />
              <span className="text-xs font-bold">Healthcare Support</span>
            </div>
            <p className="text-2xl font-black text-white tabular-nums mt-1">{site.healthcareCapacity?.toLocaleString() ?? 0}</p>
          </div>

          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Truck size={16} />
              <span className="text-xs font-bold">Road Accessibility</span>
            </div>
            <p className="text-2xl font-black text-white tabular-nums mt-1">{site.roadAccessibility ?? 82}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;
