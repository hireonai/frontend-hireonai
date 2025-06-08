import axiosInstance from "@/lib/api/axiosInstance";

export interface JobCategory {
  _id: string;
  name: string;
}

export interface JobIndustry {
  _id: string;
  name: string;
}

export interface Company {
  _id: string;
  name: string;
  industry: JobIndustry;
}

export interface JobExperience {
  _id: string;
  name: string;
}

export interface Job {
  _id: string;
  categories: JobCategory[];
  url: string;
  jobPosition: string;
  employmentType: string;
  workingLocationType: string;
  workingLocation: string;
  minSalary: number;
  maxSalary: number;
  jobDescList: string[];
  jobQualificationsList: string[];
  createdAt: string;
  updatedAt: string;
  company: Company;
  minExperience: JobExperience;
  scoreMatch: string | null;
}

export interface JobsResponseData {
  jobs: Job[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface JobsSuccessResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: JobsResponseData;
}

export interface JobsErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export interface JobsQueryParams {
  keyword?: string;
  minSalary?: number;
  maxSalary?: number;
  experience?: string;
  category?: string[];
  industry?: string;
  page?: number;
  limit?: number;
}

export type JobsResponse = JobsSuccessResponse | JobsErrorResponse;

export async function fetchJobs(
  params: JobsQueryParams = {}
): Promise<JobsResponse> {
  const {
    keyword,
    minSalary,
    maxSalary,
    experience,
    category,
    industry,
    page = 1,
    limit = 10,
  } = params;

  const queryParams: any = {};

  if (keyword) queryParams.keyword = keyword;
  if (typeof minSalary === "number") queryParams.minSalary = minSalary;
  if (typeof maxSalary === "number") queryParams.maxSalary = maxSalary;
  if (experience) queryParams.experience = experience;
  if (category && category.length > 0)
    queryParams.category = category.join(",");
  if (industry) queryParams.industry = industry;
  if (page) queryParams.page = page;
  if (limit) queryParams.limit = limit;

  try {
    const res = await axiosInstance.get("/jobs", {
      params: queryParams,
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

export interface CompanyJobDetail {
  _id: string;
  name: string;
  description: string;
  profileSrc: string;
  location: string;
  employeesCount: string;
  createdAt: string;
  updatedAt: string;
  industry: JobIndustry;
}

export interface AnalysisResult {
  _id: string;
  cvRelevanceScore: number;
  improvements: string[];
  skilIdentificationDict: Record<string, string>;
  explanation: string;
  suggestions: string[];
}

export interface JobDetail {
  _id: string;
  categories: JobCategory[];
  url: string;
  jobPosition: string;
  employmentType: string;
  workingLocationType: string;
  workingLocation: string;
  minSalary: number;
  maxSalary: number;
  jobDescList: string[];
  jobQualificationsList: string[];
  createdAt: string;
  updatedAt: string;
  company: CompanyJobDetail;
  minExperience: JobExperience;
  analysisResult: AnalysisResult | null;
}

export interface JobDetailSuccessResponse {
  statusCode: number;
  success: true;
  message: string;
  data: JobDetail;
}

export interface JobDetailErrorResponse {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type JobDetailResponse =
  | JobDetailSuccessResponse
  | JobDetailErrorResponse;

export async function fetchJobDetail(
  jobId: string
): Promise<JobDetailResponse> {
  try {
    const res = await axiosInstance.get(`/jobs/${jobId}`, {
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

export interface GenerateCoverLetterResponseSuccess {
  statusCode: number;
  success: true;
  message: string;
  data: {
    coverletterUrl: string;
  };
}

export interface GenerateCoverLetterResponseError {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type GenerateCoverLetterResponse =
  | GenerateCoverLetterResponseSuccess
  | GenerateCoverLetterResponseError;

export async function generateCoverLetterApi(
  jobId: string,
  specificRequest: string
): Promise<GenerateCoverLetterResponse> {
  try {
    const res = await axiosInstance.post(
      `/jobs/${jobId}/cover-letter`,
      { specificRequest },
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

export interface CvAnalysisResponseSuccess {
  statusCode: number;
  success: true;
  message: string;
  data: AnalysisResult;
}

export interface CvAnalysisResponseError {
  statusCode: number;
  success: false;
  message: string;
  error: string;
}

export type CvAnalysisResponse =
  | CvAnalysisResponseSuccess
  | CvAnalysisResponseError;

export async function analyzeCvApi(jobId: string): Promise<CvAnalysisResponse> {
  try {
    const res = await axiosInstance.post(`/jobs/${jobId}/analyze-cv`);
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
