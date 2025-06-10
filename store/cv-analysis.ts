import { create } from "zustand";
import type { CVAnalysisResult } from "@/lib/api/cv-analysis";
import { analyzeCVApi } from "@/lib/api/cv-analysis";

interface CVAnalysisState {
  analysisResult: CVAnalysisResult | null;
  loading: boolean;
  error: string | null;
  analyzeCV: (file: File) => Promise<void>;
  clearResult: () => void;
}

export const useCVAnalysisStore = create<CVAnalysisState>((set) => ({
  analysisResult: null,
  loading: false,
  error: null,
  analyzeCV: async (file: File) => {
    set({ loading: true, error: null, analysisResult: null });
    try {
      const result = await analyzeCVApi(file);
      set({ analysisResult: result, loading: false });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to analyze CV.",
        loading: false,
        analysisResult: null,
      });
    }
  },
  clearResult: () => set({ analysisResult: null, error: null, loading: false }),
}));
