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
  updateProfileApi,
  UpdateProfilePayload,
  uploadPhotoApi,
  UploadPhotoResponse,
  updateTagPreferencesApi,
  UpdateTagPreferencesResponse,
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
  updateProfile: (
    payload: UpdateProfilePayload
  ) => Promise<{ success: boolean; message: string }>;
  uploadPhoto: (
    file: File
  ) => Promise<{ success: boolean; message: string; photoUrl?: string }>;
  updateTagPreferences: (
    tags: string[]
  ) => Promise<{ success: boolean; message: string }>;
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
  updateProfile: async (payload) => {
    const res: ProfileResponse = await updateProfileApi(payload);
    if (res.success) {
      set({ profile: res.data });
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to update profile.",
      };
    }
  },
  uploadPhoto: async (file) => {
    const res: UploadPhotoResponse = await uploadPhotoApi(file);
    if (res.success && res.data.photoUrl) {
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            photoUrl: res.data.photoUrl,
          },
        });
      }
      return {
        success: true,
        message: res.message,
        photoUrl: res.data.photoUrl,
      };
    } else {
      return {
        success: false,
        message: res.message || "Failed to upload photo.",
      };
    }
  },
  updateTagPreferences: async (tags) => {
    const res: UpdateTagPreferencesResponse = await updateTagPreferencesApi({
      tagPreferences: tags,
    });
    if (res.success) {
      const currentProfile = get().profile;
      if (currentProfile) {
        set({
          profile: {
            ...currentProfile,
            tagPreferences: res.data.updatedTagPreferences,
          },
        });
      }
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Failed to update tag preferences.",
      };
    }
  },
}));
