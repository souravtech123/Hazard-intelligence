import {
  CreateHazardInput,
  UpdateHazardInput,
} from "./hazard.model";
import { hazardRepository } from "./hazard.repository";

export const hazardService = {
  create(data: CreateHazardInput) {
    return hazardRepository.create(data);
  },

  getAll() {
    return hazardRepository.findAll();
  },

  getById(id: string) {
    return hazardRepository.findById(id);
  },

  getByDistrict(districtId: string) {
    return hazardRepository.findByDistrict(districtId);
  },

  getByType(type: string) {
    return hazardRepository.findByType(type);
  },

  update(id: string, data: UpdateHazardInput) {
    return hazardRepository.update(id, data);
  },

  delete(id: string) {
    return hazardRepository.delete(id);
  },
};