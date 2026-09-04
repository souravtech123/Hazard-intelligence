import { prisma } from "../../config/database";
import { SEED_RELOCATION_SITES } from "../../data/seed";
import {
  CreateRelocationSiteInput,
  UpdateRelocationSiteInput,
} from "./relocation.model";

export const relocationRepository = {
  async create(data: CreateRelocationSiteInput) {
    return prisma.relocationSite.create({ data });
  },

  async findAll() {
    try {
      return await prisma.relocationSite.findMany({
        include: { district: true },
      });
    } catch {
      return SEED_RELOCATION_SITES;
    }
  },

  async findById(id: string) {
    try {
      return await prisma.relocationSite.findUnique({
        where: { id },
        include: { district: true },
      });
    } catch {
      return SEED_RELOCATION_SITES.find((s) => s.id === id) ?? null;
    }
  },

  async findByDistrict(districtId: string) {
    try {
      return await prisma.relocationSite.findMany({ where: { districtId } });
    } catch {
      return SEED_RELOCATION_SITES.filter((s) => s.districtId === districtId);
    }
  },

  async update(id: string, data: UpdateRelocationSiteInput) {
    return prisma.relocationSite.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.relocationSite.delete({ where: { id } });
  },
};