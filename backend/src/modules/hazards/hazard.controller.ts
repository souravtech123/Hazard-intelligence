import { Request, Response } from "express";
import { hazardService } from "./hazard.service";

export const hazardController = {
  async create(req: Request, res: Response) {
    try {
      const hazard = await hazardService.create(req.body);

      res.status(201).json({
        success: true,
        data: hazard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create hazard",
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const hazards = await hazardService.getAll();

      res.json({
        success: true,
        data: hazards,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch hazards",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const hazard = await hazardService.getById(String(req.params.id));

      if (!hazard) {
        res.status(404).json({
          success: false,
          message: "Hazard not found",
        });
        return;
      }

      res.json({
        success: true,
        data: hazard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch hazard",
      });
    }
  },

  async getByDistrict(req: Request, res: Response) {
    try {
      const hazards = await hazardService.getByDistrict(
        String(req.params.districtId)
      );

      res.json({
        success: true,
        data: hazards,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch district hazards",
      });
    }
  },

  async getByType(req: Request, res: Response) {
    try {
      const hazards = await hazardService.getByType(
        String(req.params.type)
      );

      res.json({
        success: true,
        data: hazards,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch hazards by type",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const hazard = await hazardService.update(
        String(req.params.id),
        req.body
      );

      res.json({
        success: true,
        data: hazard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update hazard",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await hazardService.delete(String(req.params.id));

      res.json({
        success: true,
        message: "Hazard deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete hazard",
      });
    }
  },
};
