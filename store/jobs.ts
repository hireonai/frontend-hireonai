import { create } from "zustand";
import {
  fetchJobs,
  Job,
  JobsQueryParams,
  Pagination,
  fetchJobDetail,
  JobDetail,
  JobDetailResponse,
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
}

export const useJobsStore = create<JobsState>((set) => ({
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
}));
