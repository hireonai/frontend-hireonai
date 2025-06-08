import { create } from "zustand";
import {
  getProfileApi,
  ProfileData,
  ProfileResponse,
  uploadCVApi,
  UploadCVResponse,
  bookmarkJobApi,
  unbookmarkJobApi,
  BookmarkJobResponse,
  UpdatedBookmarkJobs,
} from "../lib/api/profile";

interface ProfileState {
  profile: ProfileData | null;
  fetchProfile: () => Promise<{ success: boolean; message: string }>;
  clearProfile: () => void;
  uploadCV: (
    file: File
  ) => Promise<{ success: boolean; message: string; cvUrl?: string }>;
  bookmarkJob: (jobId: string) => Promise<{
    success: boolean;
    message: string;
    updatedBookmarkJobs?: UpdatedBookmarkJobs[];
  }>;
  unbookmarkJob: (jobId: string) => Promise<{
    success: boolean;
    message: string;
    updatedBookmarkJobs?: UpdatedBookmarkJobs[];
  }>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  fetchProfile: async () => {
    const res: ProfileResponse = await getProfileApi();
    if (res.success) {
      set({ profile: res.data });
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to fetch profile.",
      };
    }
  },
  clearProfile: () => set({ profile: null }),
  uploadCV: async (file: File) => {
    const res: UploadCVResponse = await uploadCVApi(file);
    if (res.success && res.data.cvUrl?.length) {
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            cvUrl: res.data.cvUrl,
          },
        });
      }
      return { success: true, message: res.message, cvUrl: res.data.cvUrl };
    } else {
      return {
        success: false,
        message: res.message || "Failed to upload CV.",
      };
    }
  },
  bookmarkJob: async (jobId: string) => {
    const res: BookmarkJobResponse = await bookmarkJobApi(jobId);
    if (res.success) {
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            bookmarkJobs: res.data.updatedBookmarkJobs,
          },
        });
      }
      return {
        success: true,
        message: res.message,
        updatedBookmarkJobs: res.data.updatedBookmarkJobs,
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to bookmark job.",
      };
    }
  },
  unbookmarkJob: async (jobId: string) => {
    const res: BookmarkJobResponse = await unbookmarkJobApi(jobId);
    if (res.success) {
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            bookmarkJobs: res.data.updatedBookmarkJobs,
          },
        });
      }
      return {
        success: true,
        message: res.message,
        updatedBookmarkJobs: res.data.updatedBookmarkJobs,
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to remove bookmark.",
      };
    }
  },
}));
