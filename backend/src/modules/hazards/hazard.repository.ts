import { prisma } from "../../config/database";
import { SEED_HAZARDS } from "../../data/seed";
import { CreateHazardInput, UpdateHazardInput } from "./hazard.model";

export const hazardRepository = {
  async create(data: CreateHazardInput) {
    return prisma.hazard.create({ data });
  },

  async findAll() {
    try {
      return await prisma.hazard.findMany({ include: { district: true } });
    } catch {
      return SEED_HAZARDS;
    }
  },

  async findById(id: string) {
    try {
      return await prisma.hazard.findUnique({
        where: { id },
        include: { district: true },
      });
    } catch {
      return SEED_HAZARDS.find((h) => h.id === id) ?? null;
    }
  },

  async findByDistrict(districtId: string) {
    try {
      return await prisma.hazard.findMany({ where: { districtId } });
    } catch {
      return SEED_HAZARDS.filter((h) => h.districtId === districtId);
    }
  },

  async findByType(type: string) {
    try {
      return await prisma.hazard.findMany({ where: { type } });
    } catch {
      return SEED_HAZARDS.filter(
        (h) => h.type.toLowerCase() === type.toLowerCase()
      );
    }
  },

  async update(id: string, data: UpdateHazardInput) {
    return prisma.hazard.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.hazard.delete({ where: { id } });
  },
};