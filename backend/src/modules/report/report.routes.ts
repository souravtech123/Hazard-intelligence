import { Router } from "express";
import { reportService } from "./report.service";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const reports = await reportService.getAllReports();
    res.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
});

router.get("/habitation/:habitationId", async (req, res) => {
  try {
    const report = await reportService.generateReport(req.params.habitationId);
    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
    });
  }
});

router.get("/:id/download", async (req, res) => {
  try {
    const report = await reportService.generateReport(req.params.id);
    const content = `
========================================================================
             HAZARD-INTELLIGENCE OFFICIAL EXECUTIVE AUDIT REPORT
========================================================================
Report Title : ${report.habitation.name} - Disaster Relocation Assessment
Generated At : ${new Date(report.generatedAt).toLocaleString()}
Target Scope : ${report.habitation.name}, ${report.habitation.district}, ${report.habitation.state}
Coordinates  : ${report.habitation.location.latitude}° N, ${report.habitation.location.longitude}° E

------------------------------------------------------------------------
1. DEMOGRAPHIC & POPULATION PROFILE
------------------------------------------------------------------------
Total Population        : ${report.habitation.population.toLocaleString()} residents
Vulnerable Children     : ${report.habitation.vulnerablePopulation.children.toLocaleString()}
Vulnerable Elderly      : ${report.habitation.vulnerablePopulation.elderly.toLocaleString()}
Differently Abled       : ${report.habitation.vulnerablePopulation.disabled.toLocaleString()}

------------------------------------------------------------------------
2. MULTI-CRITERIA HAZARD RISK EVALUATION
------------------------------------------------------------------------
Overall Risk Score      : ${report.riskAssessment.overallScore} / 100
Assessed Risk Severity  : ${report.riskAssessment.riskLevel}
Flood Inundation Index  : ${report.riskAssessment.floodRisk}%
Landslide Slope Index   : ${report.riskAssessment.landslideRisk}%
Historical Frequency    : ${report.riskAssessment.historicalRisk}%
Structural Exposure     : ${report.riskAssessment.exposure}%
Relocation Priority     : ${report.relocationPriority.level}

------------------------------------------------------------------------
3. RECOMMENDED SAFE HIGHLAND RELOCATION SITES
------------------------------------------------------------------------
${report.recommendations
  .map(
    (r) =>
      `Rank #${r.rank}: ${r.site.name}
  - Available Shelter Capacity: ${r.availableCapacity.toLocaleString()} people
  - Suitability Match Score   : ${r.suitabilityScore}%
  - Site Location             : ${r.site.latitude}° N, ${r.site.longitude}° E
  - Justification             : ${r.reason}`
  )
  .join("\n\n")}

========================================================================
               END OF OFFICIAL HAZARD-INTELLIGENCE REPORT
========================================================================
    `.trim();

    res.setHeader("Content-Type", "text/plain");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Hazard-Intelligence-Audit-${req.params.id}.txt"`
    );
    res.send(content);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to download report",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const report = await reportService.generateReport(req.params.id);
    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch report",
    });
  }
});

export default router;