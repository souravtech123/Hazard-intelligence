import { useEffect, useState } from "react";
import ReportPreview from "../../components/reports/ReportPreview";
import { getReports, type Report } from "../../services/report.api";

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(() => setReports([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-sm text-gray-500">
          Review generated disaster risk reports.
        </p>
      </div>

      <div className="space-y-5">
        {reports.length === 0 ? (
          <div className="rounded-xl border bg-white p-6">
            <p className="text-gray-400">No reports generated yet.</p>
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
    </div>
  );
};

export default Reports;
