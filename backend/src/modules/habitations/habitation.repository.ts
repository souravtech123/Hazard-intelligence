import { prisma } from "../../config/database";
import { SEED_HABITATIONS, SEED_DISTRICT } from "../../data/seed";
import { calculateRiskScore, classifyRisk } from "../risk/risk.engine";
import { CreateHabitationInput, UpdateHabitationInput } from "./habitation.model";

export const habitationRepository = {
  async create(data: any) {
    const floodRisk = Number(data.floodRisk ?? 50);
    const landslideRisk = Number(data.landslideRisk ?? 50);
    const historicalRisk = Number(data.historicalRisk ?? 50);
    const exposure = Number(data.exposure ?? 50);

    // Automatically calculate risk score & classify level
    const riskScore = calculateRiskScore({
      floodRisk,
      landslideRisk,
      historicalRisk,
      exposure,
    });
    const riskLevel = classifyRisk(riskScore);
    const relocationPriority =
      riskScore >= 85 ? "IMMEDIATE"
      : riskScore >= 70 ? "HIGH"
      : "MONITOR";

    const newHabitation = {
      id: data.id || `hab-${Date.now()}`,
      name: data.name || "New Location Settlement",
      districtId: data.districtId || "dist-ranchi-01",
      district: SEED_DISTRICT,
      population: Number(data.population || 1000),
      children: Number(data.children || Math.round((data.population || 1000) * 0.3)),
      elderly: Number(data.elderly || Math.round((data.population || 1000) * 0.1)),
      disabled: Number(data.disabled || Math.round((data.population || 1000) * 0.05)),
      povertyIndex: Number(data.povertyIndex || 50),
      roadAccessibility: Number(data.roadAccessibility || 50),
      healthcareAccess: Number(data.healthcareAccess || 50),
      floodRisk,
      landslideRisk,
      historicalRisk,
      exposure,
      riskScore,
      riskLevel,
      relocationPriority,
      latitude: Number(data.latitude || 23.3441),
      longitude: Number(data.longitude || 85.3196),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const created = await prisma.habitation.create({
        data: {
          name: newHabitation.name,
          districtId: newHabitation.districtId,
          population: newHabitation.population,
          children: newHabitation.children,
          elderly: newHabitation.elderly,
          disabled: newHabitation.disabled,
          povertyIndex: newHabitation.povertyIndex,
          roadAccessibility: newHabitation.roadAccessibility,
          healthcareAccess: newHabitation.healthcareAccess,
          floodRisk: newHabitation.floodRisk,
          landslideRisk: newHabitation.landslideRisk,
          historicalRisk: newHabitation.historicalRisk,
          exposure: newHabitation.exposure,
          riskScore: newHabitation.riskScore,
          riskLevel: newHabitation.riskLevel,
          relocationPriority: newHabitation.relocationPriority,
          latitude: newHabitation.latitude,
          longitude: newHabitation.longitude,
        },
      });
      return created;
    } catch {
      // In-memory fallback: Add directly to SEED_HABITATIONS array
      SEED_HABITATIONS.unshift(newHabitation);
      return newHabitation;
    }
  },

  async findAll() {
    try {
      return await prisma.habitation.findMany({ include: { district: true } });
    } catch {
      return SEED_HABITATIONS;
    }
  },

  async findById(id: string) {
    try {
      return await prisma.habitation.findUnique({
        where: { id },
        include: { district: true },
      });
    } catch {
      return SEED_HABITATIONS.find((h) => h.id === id) ?? null;
    }
  },

  async findByDistrict(districtId: string) {
    try {
      return await prisma.habitation.findMany({ where: { districtId } });
    } catch {
      return SEED_HABITATIONS.filter((h) => h.districtId === districtId);
    }
  },

  async update(id: string, data: any) {
    // Recalculate risk whenever risk factors are updated
    const existing = SEED_HABITATIONS.find((h) => h.id === id) as any;

    const floodRisk = Number(data.floodRisk ?? existing?.floodRisk ?? 50);
    const landslideRisk = Number(data.landslideRisk ?? existing?.landslideRisk ?? 50);
    const historicalRisk = Number(data.historicalRisk ?? existing?.historicalRisk ?? 50);
    const exposure = Number(data.exposure ?? existing?.exposure ?? 50);

    const riskScore = calculateRiskScore({ floodRisk, landslideRisk, historicalRisk, exposure });
    const riskLevel = classifyRisk(riskScore);
    const relocationPriority =
      riskScore >= 85 ? "IMMEDIATE"
      : riskScore >= 70 ? "HIGH"
      : "MONITOR";

    const updatedFields = {
      ...data,
      floodRisk,
      landslideRisk,
      historicalRisk,
      exposure,
      riskScore,
      riskLevel,
      relocationPriority,
      updatedAt: new Date(),
    };

    try {
      return await prisma.habitation.update({
        where: { id },
        data: updatedFields,
      });
    } catch {
      // In-memory fallback: update matching seed entry
      const idx = SEED_HABITATIONS.findIndex((h) => h.id === id);
      if (idx !== -1) {
        Object.assign(SEED_HABITATIONS[idx], updatedFields);
        return SEED_HABITATIONS[idx];
      }
      return null;
    }
  },

  async delete(id: string) {
    return prisma.habitation.delete({ where: { id } });
  },
};