import { Request, Response } from "express";
import { habitationService } from "./habitation.service";

export const habitationController = {
  async create(req: Request, res: Response) {
    try {
      const habitation = await habitationService.create(req.body);

      res.status(201).json({
        success: true,
        data: habitation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create habitation",
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const habitations = await habitationService.getAll();

      res.json({
        success: true,
        data: habitations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch habitations",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const habitation = await habitationService.getById(String(req.params.id));

      if (!habitation) {
        res.status(404).json({
          success: false,
          message: "Habitation not found",
        });
        return;
      }

      res.json({
        success: true,
        data: habitation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch habitation",
      });
    }
  },

  async getByDistrict(req: Request, res: Response) {
    try {
      const habitations = await habitationService.getByDistrict(
        String(req.params.districtId)
      );

      res.json({
        success: true,
        data: habitations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch district habitations",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const habitation = await habitationService.update(
        String(req.params.id),
        req.body
      );

      res.json({
        success: true,
        data: habitation,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update habitation",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await habitationService.delete(String(req.params.id));

      res.json({
        success: true,
        message: "Habitation deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete habitation",
      });
    }
  },
};
