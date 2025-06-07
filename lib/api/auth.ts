import axiosInstance from "@/lib/api/axiosInstance";

export interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  phone: string;
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface LoginErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

export interface RegisterSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: Omit<User, "verifiedAt" | "createdAt" | "updatedAt">;
}

export interface RegisterErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;

export async function loginApi(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post(
      "/auth/login",
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}

export interface RegisterParams {
  email: string;
  username: string;
  password: string;
  fullname: string;
  phone: string;
}

export async function registerApi(
  params: RegisterParams
): Promise<RegisterResponse> {
  try {
    const res = await axiosInstance.post("/auth/register", params, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}

export interface ForgotPasswordSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: null;
}

export interface ForgotPasswordErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type ForgotPasswordResponse =
  | ForgotPasswordSuccessResponse
  | ForgotPasswordErrorResponse;

export async function forgotPasswordApi(
  email: string
): Promise<ForgotPasswordResponse> {
  try {
    const res = await axiosInstance.post(
      "/auth/forgot-password",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}
export interface ActivateSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: null;
}

export interface ActivateErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type ActivateResponse = ActivateSuccessResponse | ActivateErrorResponse;

export async function activateApi(email: string): Promise<ActivateResponse> {
  try {
    const res = await axiosInstance.post(
      "/auth/send-activation-email",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}
export interface ResetPasswordSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: null;
}

export interface ResetPasswordErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type ResetPasswordResponse =
  | ResetPasswordSuccessResponse
  | ResetPasswordErrorResponse;

export async function resetPasswordApi(
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> {
  try {
    const res = await axiosInstance.post(
      "/auth/reset-password",
      { token, newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}
