import { useRelocation } from "../../hooks/useRelocation";
import SiteComparison from "../../components/relocation/SiteComparison";

const Relocation = () => {
  const { sites, loading, error } = useRelocation();

  if (loading) {
    return <p>Loading relocation sites...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relocation</h1>
        <p className="text-sm text-gray-500">
          Find and compare suitable relocation sites.
        </p>
      </div>

      {sites.length === 0 ? (
        <div className="rounded-xl border bg-white p-6">
          <p className="text-gray-400">No relocation sites found in the database.</p>
        </div>
      ) : (
        <SiteComparison sites={sites} />
      )}
    </div>
  );
};

export default Relocation;
