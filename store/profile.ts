import { create } from "zustand";
import {
  getProfileApi,
  ProfileData,
  ProfileResponse,
  uploadCVApi,
  UploadCVResponse,
} from "../lib/api/profile";

interface ProfileState {
  profile: ProfileData | null;
  fetchProfile: () => Promise<{ success: boolean; message: string }>;
  clearProfile: () => void;
  uploadCV: (
    file: File
  ) => Promise<{ success: boolean; message: string; cvUrl?: string }>;
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
}));
