import { prisma } from "../../config/database";
import { SEED_RELOCATION_SITES, SEED_DISTRICT } from "../../data/seed";
import { CreateRelocationSiteInput, UpdateRelocationSiteInput } from "./relocation.model";

export const relocationRepository = {
  async create(data: any) {
    const maxCapacity = Number(data.maxPopulation || data.capacity || 5000);
    const availableLand = Number(data.availableLand || 30.0);
    const roadAccessibility = Number(data.roadAccessibility || 80.0);
    const hazardRisk = Number(data.hazardRisk || 10.0);

    // Automatically compute suitability score
    const suitabilityScore = Math.round(
      Math.min(
        100,
        Math.max(
          0,
          roadAccessibility * 0.4 +
            (100 - hazardRisk) * 0.4 +
            Math.min(availableLand * 0.5, 20)
        )
      )
    );

    const newSite = {
      id: data.id || `site-${Date.now()}`,
      name: data.name || "New Safe Highland Site",
      districtId: data.districtId || "dist-ranchi-01",
      district: SEED_DISTRICT,
      latitude: Number(data.latitude || 23.415),
      longitude: Number(data.longitude || 85.275),
      availableLand,
      currentPopulation: 0,
      maxPopulation: maxCapacity,
      housingCapacity: Number(data.housingCapacity || Math.round(maxCapacity * 0.25)),
      waterCapacity: Number(data.waterCapacity || Math.round(maxCapacity * 1.1)),
      healthcareCapacity: Number(data.healthcareCapacity || Math.round(maxCapacity * 0.9)),
      infrastructureCapacity: Number(data.infrastructureCapacity || Math.round(maxCapacity * 0.85)),
      roadAccessibility,
      employmentAccessibility: Number(data.employmentAccessibility || 70.0),
      hazardRisk,
      availableCapacity: maxCapacity,
      suitabilityScore,
      createdAt: new Date(),
      updatedAt: new Date(),
      recommendations: [],
    };

    try {
      const created = await prisma.relocationSite.create({
        data: {
          name: newSite.name,
          districtId: newSite.districtId,
          latitude: newSite.latitude,
          longitude: newSite.longitude,
          availableLand: newSite.availableLand,
          currentPopulation: newSite.currentPopulation,
          maxPopulation: newSite.maxPopulation,
          housingCapacity: newSite.housingCapacity,
          waterCapacity: newSite.waterCapacity,
          healthcareCapacity: newSite.healthcareCapacity,
          infrastructureCapacity: newSite.infrastructureCapacity,
          roadAccessibility: newSite.roadAccessibility,
          employmentAccessibility: newSite.employmentAccessibility,
          hazardRisk: newSite.hazardRisk,
          availableCapacity: newSite.availableCapacity,
          suitabilityScore: newSite.suitabilityScore,
        },
      });
      return created;
    } catch {
      SEED_RELOCATION_SITES.unshift(newSite);
      return newSite;
    }
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