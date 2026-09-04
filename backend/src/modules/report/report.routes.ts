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