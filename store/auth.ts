import { create } from "zustand";
import {
  loginApi,
  registerApi,
  User,
  RegisterParams,
  forgotPasswordApi,
  activateApi,
  resetPasswordApi,
} from "../lib/api/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  setToken: (token: string) => void;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  register: (
    params: RegisterParams
  ) => Promise<{ success: boolean; message: string }>;
  forgotPassword: (
    email: string
  ) => Promise<{ success: boolean; message: string }>;
  activate: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ success: boolean; message: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setToken: (token: string) => {
    set({ token });
    localStorage.setItem("token", token);
  },
  login: async (username, password) => {
    const res = await loginApi(username, password);
    if (res.success) {
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("token", res.data.token);
      return { success: true, message: res.message };
    } else {
      return { success: false, message: res.message || "Login failed." };
    }
  },
  logout: () => set({ user: null, token: null }),
  register: async (params: RegisterParams) => {
    const res = await registerApi(params);
    if (res.success) {
      return { success: true, message: res.message };
    } else {
      return { success: false, message: res.message || "Register failed." };
    }
  },
  forgotPassword: async (email: string) => {
    const res = await forgotPasswordApi(email);
    if (res.success) {
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Forgot password failed.",
      };
    }
  },
  activate: async (email: string) => {
    const res = await activateApi(email);
    if (res.success) {
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Forgot password failed.",
      };
    }
  },
  resetPassword: async (token: string, newPassword: string) => {
    const res = await resetPasswordApi(token, newPassword);
    if (res.success) {
      return { success: true, message: res.message };
    } else {
      return {
        success: false,
        message: res.message || "Reset password failed.",
      };
    }
  },
}));
