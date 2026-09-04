import {
  CreateHabitationInput,
  UpdateHabitationInput,
} from "./habitation.model";
import { habitationRepository } from "./habitation.repository";

export const habitationService = {
  create(data: CreateHabitationInput) {
    return habitationRepository.create(data);
  },

  getAll() {
    return habitationRepository.findAll();
  },

  getById(id: string) {
    return habitationRepository.findById(id);
  },

  getByDistrict(districtId: string) {
    return habitationRepository.findByDistrict(districtId);
  },

  update(id: string, data: UpdateHabitationInput) {
    return habitationRepository.update(id, data);
  },

  delete(id: string) {
    return habitationRepository.delete(id);
  },
};