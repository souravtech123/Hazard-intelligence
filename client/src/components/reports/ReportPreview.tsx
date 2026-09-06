import { useState } from "react";
import { FileText, Download, CheckCircle2, Loader2 } from "lucide-react";
import { triggerReportDownload } from "../../services/report.api";

interface ReportPreviewProps {
  id?: string;
  title: string;
  generatedAt: string;
  summary: string;
  riskScore?: number;
  highRiskHabitations?: number;
  recommendedRelocations?: number;
}

const ReportPreview = ({
  id = "rep-001",
  title,
  generatedAt,
  summary,
  riskScore,
  highRiskHabitations,
  recommendedRelocations,
}: ReportPreviewProps) => {
  const [downloading, setDownloading] = useState(false);

  const formattedDate = new Date(generatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await triggerReportDownload(id, title, summary, riskScore);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/90 p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-800 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{title}</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">Generated on {formattedDate}</p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 text-xs font-bold shadow-lg shadow-red-900/30 transition-all shrink-0 cursor-pointer disabled:opacity-50"
        >
          {downloading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>Download Audit Report</span>
            </>
          )}
        </button>
      </div>

      {/* Summary */}
      <div className="mt-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Executive Summary</h3>
        <p className="text-xs leading-relaxed text-gray-300 bg-gray-950/80 p-4 rounded-xl border border-gray-800 font-sans">
          {summary}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {riskScore !== undefined && (
          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <p className="text-[10px] uppercase font-semibold text-gray-400">Risk Score</p>
            <p className="mt-1 text-2xl font-black font-mono text-red-400 tabular-nums">{riskScore.toFixed(1)}</p>
          </div>
        )}

        {highRiskHabitations !== undefined && (
          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <p className="text-[10px] uppercase font-semibold text-gray-400">High Risk Settlements</p>
            <p className="mt-1 text-2xl font-black font-mono text-amber-400 tabular-nums">{highRiskHabitations}</p>
          </div>
        )}

        {recommendedRelocations !== undefined && (
          <div className="rounded-xl bg-gray-950/80 border border-gray-800 p-4">
            <p className="text-[10px] uppercase font-semibold text-gray-400">Recommended Sites</p>
            <p className="mt-1 text-2xl font-black font-mono text-emerald-400 tabular-nums">{recommendedRelocations}</p>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between text-xs rounded-xl bg-emerald-950/40 border border-emerald-900/60 px-4 py-2.5">
        <span className="text-gray-400">Report Status</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
          <CheckCircle2 size={14} />
          <span>VERIFIED & READY FOR EXECUTIVE REVIEW</span>
        </span>
      </div>
    </div>
  );
};

export default ReportPreview;