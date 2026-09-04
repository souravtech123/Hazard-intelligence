import { Router } from "express";
import { riskService } from "./risk.service";

const router = Router();

router.post(
  "/calculate/:habitationId",
  async (req, res) => {
    try {
      const result =
        await riskService.calculateForHabitation(
          req.params.habitationId
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to calculate risk",
      });
    }
  }
);

router.get(
  "/:habitationId",
  async (req, res) => {
    try {
      const risk =
        await riskService.getRisk(
          req.params.habitationId
        );

      res.json({
        success: true,
        data: risk,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch risk",
      });
    }
  }
);

export default router;