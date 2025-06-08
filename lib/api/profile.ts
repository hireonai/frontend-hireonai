import axiosInstance from "@/lib/api/axiosInstance";

export interface Company {
  _id: string;
  name: string;
}

export interface BookmarkJob {
  _id: string;
  url: string;
  jobPosition: string;
  employmentType: string;
  company: Company;
  scoreMatch: string | null;
}

export interface ProfileUser {
  _id: string;
  username: string;
  email: string;
  verifiedAt: string;
}

export interface ProfileData {
  _id: string;
  fullname: string;
  phone: string;
  domicile: string;
  lastEducation: string;
  photoUrl: string;
  portfolioUrl: string;
  cvUrl: string;
  tagPreferences: string[];
  bookmarkJobs: BookmarkJob[];
  createdAt: string;
  updatedAt: string;
  user: ProfileUser;
}

export interface ProfileSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: ProfileData;
}

export interface ProfileErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type ProfileResponse = ProfileSuccessResponse | ProfileErrorResponse;

export async function getProfileApi(): Promise<ProfileResponse> {
  try {
    const res = await axiosInstance.get("/profile", {
      headers: {
        "Content-Type": "application/json",
      },
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

export interface UploadCVSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: {
    cvUrl: string;
  };
}

export interface UploadCVErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type UploadCVResponse = UploadCVSuccessResponse | UploadCVErrorResponse;

export async function uploadCVApi(file: File): Promise<UploadCVResponse> {
  const formData = new FormData();
  formData.append("cv", file);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const res = await axiosInstance.patch("/profile/cv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
