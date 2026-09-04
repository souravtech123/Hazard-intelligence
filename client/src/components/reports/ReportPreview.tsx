interface ReportPreviewProps {
  title: string;
  generatedAt: string;
  summary: string;
  riskScore?: number;
  highRiskHabitations?: number;
  recommendedRelocations?: number;
}

const ReportPreview = ({
  title,
  generatedAt,
  summary,
  riskScore,
  highRiskHabitations,
  recommendedRelocations,
}: ReportPreviewProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {title}
          </h2>

          <p className="text-sm text-gray-500">
            Generated on {generatedAt}
          </p>
        </div>

        <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Download Report
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-900">
          Executive Summary
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {summary}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {riskScore !== undefined && (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Overall Risk Score
            </p>

            <p className="mt-1 text-2xl font-bold">
              {riskScore}
            </p>
          </div>
        )}

        {highRiskHabitations !== undefined && (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              High Risk Habitations
            </p>

            <p className="mt-1 text-2xl font-bold">
              {highRiskHabitations}
            </p>
          </div>
        )}

        {recommendedRelocations !== undefined && (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Recommended Relocations
            </p>

            <p className="mt-1 text-2xl font-bold">
              {recommendedRelocations}
            </p>
          </div>
        )}
      </div>

      {/* Report Status */}
      <div className="mt-6 rounded-lg border p-4">
        <p className="text-sm font-medium text-gray-700">
          Report Status
        </p>

        <p className="mt-1 text-sm text-green-600">
          Ready for review
        </p>
      </div>
    </div>
  );
};

export default ReportPreview;