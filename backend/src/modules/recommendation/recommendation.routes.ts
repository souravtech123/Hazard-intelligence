import { Router } from "express";
import { recommendationService } from "./recommendation.service";

const router = Router();

router.get(
  "/:habitationId",
  async (req, res) => {
    try {
      const recommendations =
        await recommendationService.recommend(
          req.params.habitationId
        );

      res.json({
        success: true,
        data: recommendations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to generate recommendations",
      });
    }
  }
);

router.post(
  "/:habitationId/save",
  async (req, res) => {
    try {
      const recommendations =
        await recommendationService.saveRecommendations(
          req.params.habitationId
        );

      res.json({
        success: true,
        data: recommendations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to save recommendations",
      });
    }
  }
);

router.get(
  "/:habitationId/saved",
  async (req, res) => {
    try {
      const recommendations =
        await recommendationService.getSavedRecommendations(
          req.params.habitationId
        );

      res.json({
        success: true,
        data: recommendations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch recommendations",
      });
    }
  }
);

export default router;