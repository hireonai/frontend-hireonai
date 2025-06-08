import axiosInstance from "@/lib/api/axiosInstance";

export interface Data {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: Data[];
}

export interface ErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type Response = SuccessResponse | ErrorResponse;

export async function companyIndustriesApi(): Promise<Response> {
  try {
    const res = await axiosInstance.get("/company-industries", {
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

export async function jobCategoriesApi(): Promise<Response> {
  try {
    const res = await axiosInstance.get("/job-categories", {
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

export async function jobMinExperiencesApi(): Promise<Response> {
  try {
    const res = await axiosInstance.get("/job-min-experiences", {
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
