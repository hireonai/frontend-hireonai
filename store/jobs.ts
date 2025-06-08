import { create } from "zustand";
import {
  fetchJobs,
  Job,
  JobsQueryParams,
  Pagination,
  fetchJobDetail,
  JobDetail,
  JobDetailResponse,
  generateCoverLetterApi,
  GenerateCoverLetterResponse,
  analyzeCvApi,
  CvAnalysisResponse,
} from "@/lib/api/jobs";

interface JobsState {
  jobs: Job[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  fetchJobsList: (params?: JobsQueryParams) => Promise<void>;
  jobDetail: JobDetail | null;
  fetchJobDetailById: (
    jobId: string
  ) => Promise<{ success: boolean; message: string }>;
  coverletterUrl: string | null;
  coverLetterLoading: boolean;
  generateCoverLetter: (
    jobId: string,
    specificRequest: string
  ) => Promise<{ success: boolean; message: string; url?: string }>;
  clearCoverLetter: () => void;
  analyzingCV: boolean;
  analyzeCV: (jobId: string) => Promise<{ success: boolean; message: string }>;
}

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  pagination: null,
  loading: false,
  error: null,
  fetchJobsList: async (params) => {
    set({ loading: true, error: null });
    try {
      console.log(params);
      const res = await fetchJobs(params);
      if (res.success) {
        set({
          jobs: res.data.jobs,
          pagination: res.data.pagination,
          loading: false,
        });
      } else {
        set({
          jobs: [],
          pagination: null,
          loading: false,
          error: res.message,
        });
      }
    } catch (err: any) {
      set({
        jobs: [],
        pagination: null,
        loading: false,
        error: err?.message || "Failed to fetch jobs.",
      });
    }
  },
  jobDetail: null,
  fetchJobDetailById: async (jobId: string) => {
    const res: JobDetailResponse = await fetchJobDetail(jobId);
    if (res.success) {
      set({ jobDetail: res.data });
      return { success: true, message: res.message };
    } else {
      set({ jobDetail: null, error: res.message });
      return {
        success: false,
        message: res.message || "Failed to fetch job detail.",
      };
    }
  },
  coverletterUrl: null,
  coverLetterLoading: false,
  generateCoverLetter: async (jobId: string, specificRequest: string) => {
    set({
      coverLetterLoading: true,
      coverletterUrl: null,
    });
    const res: GenerateCoverLetterResponse = await generateCoverLetterApi(
      jobId,
      specificRequest
    );
    if (res.success) {
      set({
        coverletterUrl: res.data.coverletterUrl,
        coverLetterLoading: false,
      });
      return {
        success: true,
        message: res.message,
        url: res.data.coverletterUrl,
      };
    } else {
      set({
        coverletterUrl: null,
        coverLetterLoading: false,
      });
      return {
        success: false,
        message: res.message,
      };
    }
  },
  clearCoverLetter: () => {
    set({
      coverletterUrl: null,
      coverLetterLoading: false,
    });
  },
  analyzingCV: false,
  analyzeCV: async (jobId: string) => {
    set({ analyzingCV: true });
    const res: CvAnalysisResponse = await analyzeCvApi(jobId);
    if (res.success) {
      const currentDetail = get().jobDetail;
      if (currentDetail && currentDetail._id === jobId) {
        set({
          jobDetail: {
            ...currentDetail,
            analysisResult: res.data,
          },
        });
      }
      set({ analyzingCV: false });
      return { success: true, message: res.message };
    } else {
      set({ analyzingCV: false });
      return { success: false, message: res.message };
    }
  },
}));
