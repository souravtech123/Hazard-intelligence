interface AllocationViewProps {
  habitationName: string;
  population: number;
  siteName: string;
  siteCapacity: number;
  onAllocate?: () => void;
}

const AllocationView = ({
  habitationName,
  population,
  siteName,
  siteCapacity,
  onAllocate,
}: AllocationViewProps) => {
  const remainingCapacity = siteCapacity - population;

  return (
    <div className="rounded-xl border bg-white p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Habitation
          </p>

          <h3 className="text-lg font-semibold">
            {habitationName}
          </h3>

          <p className="mt-2 text-sm">
            Population: <strong>{population}</strong>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Relocation Site
          </p>

          <h3 className="text-lg font-semibold">
            {siteName}
          </h3>

          <p className="mt-2 text-sm">
            Capacity: <strong>{siteCapacity}</strong>
          </p>

          <p className="text-sm text-gray-600">
            Remaining: {Math.max(0, remainingCapacity)}
          </p>
        </div>
      </div>

      <button
        onClick={onAllocate}
        disabled={remainingCapacity < 0}
        className="mt-6 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirm Allocation
      </button>
    </div>
  );
};

export default AllocationView;