import { Request, Response } from "express";
import { relocationService } from "./relocation.service";

export const relocationController = {
  async create(req: Request, res: Response) {
    try {
      const site = await relocationService.create(req.body);

      res.status(201).json({
        success: true,
        data: site,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create relocation site",
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const sites = await relocationService.getAll();

      res.json({
        success: true,
        data: sites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch relocation sites",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const site = await relocationService.getById(
        String(req.params.id)
      );

      if (!site) {
        res.status(404).json({
          success: false,
          message: "Relocation site not found",
        });
        return;
      }

      res.json({
        success: true,
        data: site,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch relocation site",
      });
    }
  },

  async getByDistrict(req: Request, res: Response) {
    try {
      const sites = await relocationService.getByDistrict(
        String(req.params.districtId)
      );

      res.json({
        success: true,
        data: sites,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch district relocation sites",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const site = await relocationService.update(
        String(req.params.id),
        req.body
      );

      res.json({
        success: true,
        data: site,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update relocation site",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await relocationService.delete(String(req.params.id));

      res.json({
        success: true,
        message: "Relocation site deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete relocation site",
      });
    }
  },
};
