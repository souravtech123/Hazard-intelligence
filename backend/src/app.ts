import express from "express";
import cors from "cors";
import helmet from "helmet";

import habitationRoutes from "./modules/habitations/habitation.routes";
import hazardRoutes from "./modules/hazards/hazard.routes";
import riskRoutes from "./modules/risk/risk.routes";
import relocationRoutes from "./modules/relocation/relocation.routes";
import recommendationRoutes from "./modules/recommendation/recommendation.routes";
import scenarioRoutes from "./modules/scenario/scenario.routes";
import reportRoutes from "./modules/report/report.routes";

import { notFoundMiddleware } from "./shared/middleware/not-found.middleware";
import { errorMiddleware } from "./shared/middleware/error.middleware";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middleware
|--------------------------------------------------------------------------
*/

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/habitations", habitationRoutes);
app.use("/api/hazards", hazardRoutes);
app.use("/api/risk", riskRoutes);
app.use("/api/relocation", relocationRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/scenarios", scenarioRoutes);
app.use("/api/reports", reportRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFoundMiddleware);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

export default app;
