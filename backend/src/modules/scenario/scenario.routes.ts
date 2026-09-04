import { Router, Request, Response } from "express";
import { scenarioService } from "./scenario.service";

const router = Router();

router.post("/run", async (req: Request, res: Response) => {
  try {
    const { hazardType = "Flood", severity = 50 } = req.body;
    const result = await scenarioService.runScenario({
      hazardType: String(hazardType),
      severity: Number(severity),
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to execute scenario simulation",
    });
  }
});

router.get("/types", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: ["Flood", "Landslide", "Cyclone", "Drought", "Earthquake"],
  });
});

export default router;
