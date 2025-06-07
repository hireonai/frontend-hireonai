import { create } from "zustand";
import {
  getProfileApi,
  ProfileData,
  ProfileResponse,
} from "../lib/api/profile";

interface ProfileState {
  profile: ProfileData | null;
  fetchProfile: () => Promise<{ success: boolean; message: string }>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
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
}));
