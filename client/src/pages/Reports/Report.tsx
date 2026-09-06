import { useEffect, useState } from "react";
import ReportPreview from "../../components/reports/ReportPreview";
import { getReports, type Report } from "../../services/report.api";
import { FileText } from "lucide-react";

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 mb-2">
            <FileText size={14} />
            <span>Official Audit Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Disaster Risk & Relocation Reports
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Review and export generated relocation assessment reports for emergency responders and government state planning officers.
          </p>
        </div>
      </div>

      {loading && <div className="p-12 text-center text-gray-400 font-semibold">Loading audit reports...</div>}

      {!loading && (
        <div className="space-y-5">
          {reports.length === 0 ? (
            <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-8 text-center text-gray-400">
              No audit reports generated yet.
            </div>
          ) : (
            reports.map((report) => (
              <ReportPreview
                key={report.id}
                title={report.title}
                generatedAt={report.generatedAt}
                summary={report.summary}
                riskScore={report.riskScore}
                highRiskHabitations={report.highRiskHabitations}
                recommendedRelocations={report.recommendedRelocations}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
