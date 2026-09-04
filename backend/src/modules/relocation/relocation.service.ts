import {
  CreateRelocationSiteInput,
  UpdateRelocationSiteInput,
} from "./relocation.model";

import { relocationRepository } from "./relocation.repository";

import { calculateAvailableCapacity } from "./relocation.engine";

export const relocationService = {
  async create(data: CreateRelocationSiteInput) {
    const availableCapacity = calculateAvailableCapacity(data);

    return relocationRepository.create({
      ...data,
      availableCapacity,
    });
  },

  getAll() {
    return relocationRepository.findAll();
  },

  getById(id: string) {
    return relocationRepository.findById(id);
  },

  getByDistrict(districtId: string) {
    return relocationRepository.findByDistrict(districtId);
  },

  async update(
    id: string,
    data: UpdateRelocationSiteInput
  ) {
    const existing = await relocationRepository.findById(id);

    if (!existing) {
      throw new Error("Relocation site not found");
    }

    const mergedData = {
      housingCapacity:
        data.housingCapacity ?? existing.housingCapacity,

      waterCapacity:
        data.waterCapacity ?? existing.waterCapacity,

      healthcareCapacity:
        data.healthcareCapacity ?? existing.healthcareCapacity,

      infrastructureCapacity:
        data.infrastructureCapacity ??
        existing.infrastructureCapacity,

      availableLand:
        data.availableLand ?? existing.availableLand,
    };

    const availableCapacity =
      calculateAvailableCapacity(mergedData);

    return relocationRepository.update(id, {
      ...data,
      availableCapacity,
    });
  },

  delete(id: string) {
    return relocationRepository.delete(id);
  },
};