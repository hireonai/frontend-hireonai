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

export interface DeleteCVSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: null;
}

export interface DeleteCVErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type DeleteCVResponse = DeleteCVSuccessResponse | DeleteCVErrorResponse;

export async function deleteCVApi(): Promise<DeleteCVResponse> {
  try {
    const res = await axiosInstance.delete("/profile/cv", {
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

export interface UpdatedBookmarkJobs {
  updatedBookmarkJobs: [];
}

export interface BookmarkJobResponseSuccess {
  statusCode: number;
  success: true;
  message: string;
  data: UpdatedBookmarkJobs;
}

export interface BookmarkJobResponseError {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type BookmarkJobResponse =
  | BookmarkJobResponseSuccess
  | BookmarkJobResponseError;

export async function bookmarkJobApi(
  jobId: string
): Promise<BookmarkJobResponse> {
  try {
    const res = await axiosInstance.post(
      "/profile/bookmark-job",
      { jobId },
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

export async function unbookmarkJobApi(
  jobId: string
): Promise<BookmarkJobResponse> {
  try {
    const res = await axiosInstance.delete(`/profile/bookmark-job/${jobId}`, {
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

export interface UpdateProfilePayload {
  fullname: string;
  phone: string;
  domicile: string;
  lastEducation: string;
  portfolioUrl: string;
}

export async function updateProfileApi(
  payload: UpdateProfilePayload
): Promise<ProfileResponse> {
  try {
    const res = await axiosInstance.put("/profile", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) return error.response.data;
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}

export interface UploadPhotoSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: {
    photoUrl: string;
  };
}
export interface UploadPhotoErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}
export type UploadPhotoResponse =
  | UploadPhotoSuccessResponse
  | UploadPhotoErrorResponse;

export async function uploadPhotoApi(file: File): Promise<UploadPhotoResponse> {
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await axiosInstance.patch("/profile/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) return error.response.data;
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}

export interface UpdateTagPreferencesPayload {
  tagPreferences: string[];
}
export interface UpdateTagPreferencesSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: {
    updatedTagPreferences: string[];
  };
}
export interface UpdateTagPreferencesErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}
export type UpdateTagPreferencesResponse =
  | UpdateTagPreferencesSuccessResponse
  | UpdateTagPreferencesErrorResponse;

export async function updateTagPreferencesApi(
  payload: UpdateTagPreferencesPayload
): Promise<UpdateTagPreferencesResponse> {
  try {
    const res = await axiosInstance.patch("/profile/tag-preferences", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) return error.response.data;
    return {
      statusCode: 500,
      success: false,
      message: "Internal Server Error.",
      error: "Internal Server Error",
    };
  }
}
