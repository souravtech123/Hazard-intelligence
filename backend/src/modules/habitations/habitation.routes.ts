import { Router } from "express";
import { habitationController } from "./habitation.controller";

const router = Router();

router.post("/", habitationController.create);

router.get("/", habitationController.getAll);

router.get(
  "/district/:districtId",
  habitationController.getByDistrict
);

router.get("/:id", habitationController.getById);

router.put("/:id", habitationController.update);

router.delete("/:id", habitationController.delete);

export default router;