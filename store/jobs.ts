import { create } from "zustand";
import { fetchJobs, Job, JobsQueryParams, Pagination } from "@/lib/api/jobs";

interface JobsState {
  jobs: Job[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  fetchJobsList: (params?: JobsQueryParams) => Promise<void>;
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
        error: err?.message || "Failed to fetch jobs",
      });
    }
  },
}));
