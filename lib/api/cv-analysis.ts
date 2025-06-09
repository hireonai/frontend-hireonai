import axios from "axios";
export interface CVSectionAnalysis {
  score: number;
  comment: string;
}
export interface CVAnalysisResult {
  overall_score: number;
  score_breakdown: {
    technical_skills: number;
    experience_relevance: number;
    education: number;
    achievement: number;
  };
  cv_strengths: string[];
  areas_for_improvement: string[];
  section_analysis: {
    work_experience: CVSectionAnalysis;
    education: CVSectionAnalysis;
    skills: CVSectionAnalysis;
    achievements: CVSectionAnalysis;
  };
  processing_time_seconds: number;
  model: string;
}

export async function analyzeCVApi(file: File): Promise<CVAnalysisResult> {
  const formData = new FormData();
  formData.append("cv_file", file);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_ML_SERVICE_URL}/api/gen-ai-services/general-cv-analysis`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-Key": process.env.NEXT_PUBLIC_ML_SERVICE_SECRET_KEY,
      },
    }
  );
  return res.data;
}
