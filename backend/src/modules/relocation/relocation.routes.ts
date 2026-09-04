import { Router } from "express";
import { relocationController } from "./relocation.controller";

const router = Router();

router.post("/", relocationController.create);

router.get("/", relocationController.getAll);

router.get(
  "/district/:districtId",
  relocationController.getByDistrict
);

router.get("/:id", relocationController.getById);

router.put("/:id", relocationController.update);

router.delete("/:id", relocationController.delete);

export default router;