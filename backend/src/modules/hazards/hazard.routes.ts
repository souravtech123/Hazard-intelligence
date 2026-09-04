import { Router } from "express";
import { hazardController } from "./hazard.controller";

const router = Router();

router.post("/", hazardController.create);

router.get("/", hazardController.getAll);

router.get(
  "/district/:districtId",
  hazardController.getByDistrict
);

router.get(
  "/type/:type",
  hazardController.getByType
);

router.get("/:id", hazardController.getById);

router.put("/:id", hazardController.update);

router.delete("/:id", hazardController.delete);

export default router;