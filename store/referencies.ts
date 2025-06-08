import { create } from "zustand";
import {
  Data,
  jobCategoriesApi,
  jobMinExperiencesApi,
  companyIndustriesApi,
} from "../lib/api/referencies";

interface ReferenciesState {
  jobCategories: Data[] | null;
  fetchJobCategories: () => Promise<{ success: boolean; message: string }>;
  jobMinExperiences: Data[] | null;
  fetchJobMinExperiences: () => Promise<{ success: boolean; message: string }>;
  companyIndustries: Data[] | null;
  fetchCompanyIndustries: () => Promise<{ success: boolean; message: string }>;
}

export const useReferenciesStore = create<ReferenciesState>((set) => ({
  jobCategories: null,
  fetchJobCategories: async () => {
    const res = await jobCategoriesApi();
    if (res.success) {
      set({ jobCategories: res.data });
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to fetch job categories.",
      };
    }
  },
  jobMinExperiences: null,
  fetchJobMinExperiences: async () => {
    const res = await jobMinExperiencesApi();
    if (res.success) {
      set({ jobMinExperiences: res.data });
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to fetch job min experiences.",
      };
    }
  },
  companyIndustries: null,
  fetchCompanyIndustries: async () => {
    const res = await companyIndustriesApi();
    if (res.success) {
      set({ companyIndustries: res.data });
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to fetch job min experiences.",
      };
    }
  },
}));
