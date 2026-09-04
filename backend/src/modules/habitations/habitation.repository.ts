import { prisma } from "../../config/database";
import { SEED_HABITATIONS } from "../../data/seed";
import {
  CreateHabitationInput,
  UpdateHabitationInput,
} from "./habitation.model";

export const habitationRepository = {
  async create(data: CreateHabitationInput) {
    return prisma.habitation.create({ data });
  },

  async findAll() {
    try {
      return await prisma.habitation.findMany({ include: { district: true } });
    } catch {
      // DB unavailable → return real seed data
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

  async update(id: string, data: UpdateHabitationInput) {
    return prisma.habitation.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.habitation.delete({ where: { id } });
  },
};