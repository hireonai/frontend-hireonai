"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  FileText,
  TrendingUp,
  AlertTriangle,
  Bookmark,
  ExternalLink,
  ArrowLeft,
  Newspaper,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useProfileStore } from "@/store/profile";
import { useParams, useRouter } from "next/navigation";
import { useJobsStore } from "@/store/jobs";
import { useToast } from "@/hooks/use-toast";
import { JobDetailSkeleton } from "@/components/job-detail-skeleton";

export default function JobDetailPage() {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => setAnimateProgress(true), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const bookmarkJob = useProfileStore((state) => state.bookmarkJob);
  const unbookmarkJob = useProfileStore((state) => state.unbookmarkJob);
  const [savingBookmark, setSavingBookmark] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (profile === null) {
      fetchProfile().then((res) => {
        if (!res.success) {
          router.push("/login");
        }
      });
    }
  }, [profile, fetchProfile, router]);

  const params = useParams();
  const jobId = params?.id as string;

  const {
    loadingDetail,
    jobDetail,
    fetchJobDetailById,
    coverLetterLoading,
    coverletterUrl,
    generateCoverLetter,
    clearCoverLetter,
    analyzingCV,
    analyzeCV,
  } = useJobsStore();

  const isBookmarked = !!profile?.bookmarkJobs?.find(
    (job) => job._id === jobId
  );

  const handleAnalyzeCV = async () => {
    if (!jobId) return;
    const res = await analyzeCV(jobId);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: res.message,
        variant: "error",
      });
      await fetchJobDetailById(jobId);
    }
  };

  const handleGenerateCoverLetter = async () => {
    const result = await generateCoverLetter(jobId, coverLetterText);
    if (result.success && result.url) {
      window.open(result.url, "_blank");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "error",
      });
    }
  };

  const handleToggleBookmark = async () => {
    setSavingBookmark(true);
    let result;
    if (isBookmarked) {
      result = await unbookmarkJob(jobId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Job removed from bookmarks.",
          variant: "success",
        });
        await fetchProfile();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "error",
        });
      }
    } else {
      result = await bookmarkJob(jobId);
      if (result.success) {
        toast({
          title: "Success",
          description: "Job added to bookmarks.",
          variant: "success",
        });
        await fetchProfile();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "error",
        });
      }
    }
    setSavingBookmark(false);
  };

  useEffect(() => {
    if (jobId) {
      fetchJobDetailById(jobId);
    }
    clearCoverLetter();
  }, [jobId, fetchJobDetailById]);

  const getScoreColor = (score: number | null | undefined) => {
    if (score === null || score === undefined) return "#9CA3AF";
    if (score >= 85) return "#34C759";
    if (score >= 60) return "#45B3FA";
    if (score >= 45) return "#FFC107";
    return "#FF6F6F";
  };

  function contentAnalysisExplanation() {
    return (
      <>
        {" "}
        <CardHeader>
          <CardTitle className="transition-colors duration-300 group-hover:text-[#4A90A4]">
            Analysis Explanation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobDetail?.analysisResult ? (
            <>
              <p className="text-sm text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                {jobDetail?.analysisResult?.explanation}
              </p>

              <div>
                <h4 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-[#FF8A50]">
                  Suggestions:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {jobDetail?.analysisResult?.suggestions.map(
                    (suggestion, index) => (
                      <li
                        key={index}
                        className={`animate-in fade-in slide-in-from-left-2 duration-300 delay-[800 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-orange-50 p-1 rounded`}
                      >
                        •{" "}
                        <span className="transition-colors duration-300 group-hover/item:text-orange-700">
                          {suggestion}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
              <FileText className="w-12 h-12 mb-2 text-[#4A90A4]" />
              <div className="text-lg font-semibold mb-2">
                No analysis result yet
              </div>
              <div className="text-sm text-gray-500">
                Please analyze your CV to see detailed suggestions and
                explanations.
              </div>
            </div>
          )}
        </CardContent>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with animations */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/hireon-logo.png"
              alt="hireon Logo"
              className="h-8 w-auto align-middle"
            />
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
              HireOn.AI
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        {loadingDetail || !jobDetail ? (
          <JobDetailSkeleton />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Job Header */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-all duration-500 hover:shadow-2xl group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 via-transparent to-[#FF8A50]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardContent className="p-6 sm:p-8 relative z-10">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                            {jobDetail?.jobPosition}
                          </h1>
                          <p className="text-lg sm:text-xl text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                            {jobDetail?.company?.name}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 mb-6">
                        <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                          <MapPin className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm sm:text-base">
                            {jobDetail?.workingLocation}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                          <Users className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm sm:text-base">
                            {jobDetail?.company?.employeesCount} Employees
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#FF8A50] hover:scale-105 group/item">
                          <DollarSign className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm sm:text-base">
                            {jobDetail?.minSalary.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}{" "}
                            -{" "}
                            {jobDetail?.maxSalary.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                          <Clock className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm sm:text-base">
                            {jobDetail?.employmentType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-[#4A90A4] hover:bg-[#D1E8EC] hover:text-[#4A90A4] px-8 transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 flex-1 sm:flex-none"
                      onClick={handleAnalyzeCV}
                      disabled={analyzingCV || profile?.cvUrl === null}
                    >
                      {analyzingCV ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Analyzing...
                        </span>
                      ) : (
                        "Analyze CV"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleToggleBookmark}
                      disabled={savingBookmark}
                      className={`transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center space-x-2 ${
                        isBookmarked
                          ? "bg-[#FF8A50] text-white border-[#FF8A50]"
                          : ""
                      }`}
                    >
                      <Bookmark
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isBookmarked ? "fill-current" : ""
                        }`}
                      />
                      <span>{isBookmarked ? "Saved" : "Save Job"}</span>
                    </Button>
                    {jobDetail?.url ? (
                      <Button
                        variant="outline"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-md"
                        onClick={() => window.open(jobDetail?.url, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Job
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="transition-all duration-300 hover:scale-105 hover:shadow-md"
                        disabled
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Job
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Company Description */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all  hover:shadow-xl hover:scale-[1.02] group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                    <div className="w-12 aspect-square rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105">
                      <img
                        src={jobDetail?.company?.profileSrc}
                        className="w-full h-full object-cover"
                        alt="Company Profile"
                      />
                    </div>
                    <span>{jobDetail?.company?.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-gray-700">
                      <strong>{jobDetail?.company?.industry?.name}</strong>
                    </p>
                    <p className="text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                      {jobDetail?.company?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Job Description */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 transition-all hover:shadow-xl group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                    <span>Job Description</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                      <span>Requirements:</span>
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      {jobDetail?.jobDescList.map((requirement, index) => (
                        <li
                          key={index}
                          className={`flex items-start space-x-3 animate-in fade-in slide-in-from-left-2 duration-500 delay-[${
                            800 + index * 100
                          }ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-gray-50 p-2 rounded-lg`}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="transition-colors duration-300 group-hover/item:text-green-700 text-sm sm:text-base">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#FF8A50]">
                      <span>Responsibilities:</span>
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      {jobDetail?.jobQualificationsList.map(
                        (responsibility, index) => (
                          <li
                            key={index}
                            className={`animate-in fade-in slide-in-from-right-2 duration-500 delay-[1200 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-gray-50 p-2 rounded-lg text-sm sm:text-base`}
                          >
                            • {responsibility}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Analysis Explanation */}
              <Card className="hidden lg:block animate-in fade-in slide-in-from-right-4 duration-1000 delay-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
                {contentAnalysisExplanation()}
              </Card>
            </div>

            <div className="space-y-6">
              {/* Enhanced AI Cover Letter Generator */}
              <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-300 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#B01FCE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#B01FCE] rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-[#B01FCE]/30">
                      <Newspaper className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-12" />
                    </div>
                    <span className="transition-colors duration-300 group-hover:text-[#B01FCE]">
                      AI Cover Letter Generator
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                    Generate a personalized cover letter for this position using
                    AI.
                  </p>
                  <Textarea
                    rows={4}
                    placeholder="Enter your suggestions for the cover letter"
                    value={coverLetterText}
                    onChange={(e) => setCoverLetterText(e.target.value)}
                    disabled={coverLetterLoading || profile?.cvUrl === null}
                  />
                  <Button
                    className="mt-4 w-full bg-[#B01FCE] hover:bg-white hover:text-[#B01FCE] transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                    onClick={handleGenerateCoverLetter}
                    disabled={coverLetterLoading || profile?.cvUrl === null}
                  >
                    {coverLetterLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Generating...
                      </span>
                    ) : (
                      "Generate Cover Letter"
                    )}
                  </Button>
                  {coverletterUrl && (
                    <Button
                      className="mt-4 w-full bg-white text-[#B01FCE] hover:bg-[#B01FCE] hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                      variant="outline"
                      onClick={() => window.open(coverletterUrl, "_blank")}
                    >
                      Download Cover Letter
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced CV Analysis */}
              <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-500 transition-all duration-500 hover:shadow-2xl group">
                <CardHeader>
                  <CardTitle className="transition-colors duration-300 group-hover:text-[#4A90A4]">
                    CV Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobDetail?.analysisResult ? (
                    <>
                      <div className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-2 group-hover:scale-105 transition-transform duration-500">
                          <svg
                            className="w-full h-full transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="#e5e7eb"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke={getScoreColor(
                                jobDetail?.analysisResult?.cvRelevanceScore
                              )}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="0 251.2"
                              strokeLinecap="round"
                              style={{
                                transition: "stroke-dasharray 2s ease-out",
                                strokeDasharray: animateProgress
                                  ? `${
                                      (typeof jobDetail?.analysisResult
                                        ?.cvRelevanceScore === "number"
                                        ? jobDetail.analysisResult
                                            .cvRelevanceScore
                                        : 0) * 2.51
                                    } 251.2`
                                  : "0 251.2",
                              }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-1000 delay-1200">
                            <span
                              className={`text-3xl font-bold text-[${getScoreColor(
                                jobDetail?.analysisResult?.cvRelevanceScore
                              )}] transition-all duration-300 group-hover:scale-110`}
                            >
                              {jobDetail?.analysisResult?.cvRelevanceScore}%
                            </span>
                            <span
                              className={`text-xs text-[${getScoreColor(
                                jobDetail?.analysisResult?.cvRelevanceScore
                              )}] font-medium`}
                            >
                              Match Score
                            </span>
                          </div>
                        </div>
                      </div>
                      <Separator />

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-600 transition-transform duration-300 group-hover:scale-125" />
                          <span className="transition-colors duration-300 group-hover:text-green-600">
                            Your Strengths
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {jobDetail?.analysisResult?.skilIdentificationDict &&
                            Object.entries(
                              jobDetail.analysisResult.skilIdentificationDict
                            ).map(([skillName, value], idx) => (
                              <div
                                key={skillName}
                                className="group/skill hover:scale-[1.02] transition-transform duration-300"
                              >
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="transition-colors duration-300 group-hover/skill:font-medium">
                                    {skillName}
                                  </span>
                                  <span
                                    className="font-medium transition-all duration-300 group-hover/skill:scale-110"
                                    style={{ color: getScoreColor(value) }}
                                  >
                                    {animateProgress ? value : 0}%
                                  </span>
                                </div>
                                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden transition-all duration-300 group-hover/skill:h-3">
                                  <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                      backgroundColor: getScoreColor(value),
                                      width: animateProgress
                                        ? `${value}%`
                                        : "0%",
                                      transition: `width 1.5s ease-out ${
                                        idx * 0.3 + 1
                                      }s`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mt-6 mb-3 flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-orange-600 transition-transform duration-300 group-hover:scale-125" />
                          <span className="transition-colors duration-300 group-hover:text-orange-600">
                            Areas for Improvement
                          </span>
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {jobDetail?.analysisResult?.improvements.map(
                            (improvement, index) => (
                              <li
                                key={index}
                                className={`animate-in fade-in slide-in-from-right-2 duration-500 delay-[1500 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-orange-50 p-2 rounded-lg`}
                              >
                                •{" "}
                                <span className="transition-colors duration-300 group-hover/item:text-orange-700">
                                  {improvement}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
                      <FileText className="w-12 h-12 mb-4 text-[#4A90A4]" />
                      <div className="text-lg font-semibold mb-2">
                        No Analysis Available
                      </div>
                      <div className="text-sm text-gray-500">
                        You haven't analyzed your CV for this job yet.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="block lg:hidden animate-in fade-in slide-in-from-right-4 duration-1000 delay-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
                {contentAnalysisExplanation()}
              </Card>
            </div>
          </div>
        )}

        {/* Enhanced Right Sidebar */}
      </div>

      {/* Animations for progress/circle graph */}
      <style jsx global>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 251.2;
          }
          to {
            stroke-dasharray: 225.9 251.2;
          }
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(10px, -10px) scale(1.08);
          }
          66% {
            transform: translate(-12px, 8px) scale(0.92);
          }
        }
        .animate-blob {
          animation: blob 6s infinite;
        }
        .animate-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .slide-in-from-bottom-8 {
          animation-delay: 0.1s;
        }
        .slide-in-from-top-4 {
          animation-delay: 0.1s;
        }
        .slide-in-from-left-2,
        .slide-in-from-right-2 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
}
