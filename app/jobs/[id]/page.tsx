"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  ChevronDown,
  User,
  Bookmark,
  Share2,
  Building,
  Calendar,
  Award,
  Target,
  Star,
  ExternalLink,
  ArrowLeft,
  Newspaper,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProfileStore } from "@/store/profile";
import { useRouter } from "next/navigation";

export default function JobDetailPage() {
  const [animateProgress, setAnimateProgress] = useState(false);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      // Trigger progress animations after content loads
      setTimeout(() => setAnimateProgress(true), 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGenerateCoverLetter = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
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
                          Senior Frontend Developer
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 mb-4 transition-colors duration-300 group-hover:text-gray-700">
                          TechCorp Solutions
                        </p>
                      </div>
                      <Badge className="bg-[#4A90A4] text-white ml-4 animate-pulse hover:animate-none transition-all duration-300 hover:scale-110 hover:shadow-lg">
                        90% Match
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 mb-6">
                      <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                        <MapPin className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                        <span className="text-sm sm:text-base">
                          Jakarta Pusat
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                        <Users className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                        <span className="text-sm sm:text-base">
                          50-100 Employees
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#FF8A50] hover:scale-105 group/item">
                        <DollarSign className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                        <span className="text-sm sm:text-base">
                          $60,000 - $80,000
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 transition-all duration-300 hover:text-[#4A90A4] hover:scale-105 group/item">
                        <Clock className="w-4 h-4 transition-transform duration-300 group-hover/item:scale-125" />
                        <span className="text-sm sm:text-base">Full-time</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-[#4A90A4] hover:bg-[#D1E8EC] hover:text-[#4A90A4] px-8 transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 flex-1 sm:flex-none">
                    Analyze CV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleSaveJob}
                    className={`transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center space-x-2 ${
                      isSaved ? "bg-[#FF8A50] text-white border-[#FF8A50]" : ""
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isSaved ? "fill-current" : ""
                      }`}
                    />
                    <span>{isSaved ? "Saved" : "Save Job"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Apply Job
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Company Description */}
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                  <Building className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                  <span>About TechCorp Solutions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <p className="text-gray-600 mb-4 font-medium transition-colors duration-300 group-hover:text-gray-700">
                    <strong>
                      Technology and Software Solutions - Bringin Inti Teknologi
                    </strong>
                  </p>
                  <p className="text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                    TechCorp Solutions is a leading technology company
                    specializing in innovative software solutions for businesses
                    across various industries. We are committed to delivering
                    cutting-edge technology that drives digital transformation
                    and helps our clients achieve their business objectives. Our
                    team of talented professionals works in a collaborative
                    environment that fosters creativity, innovation, and
                    professional growth.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Job Description */}
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 transition-all duration-500 hover:shadow-xl group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                  <FileText className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                  <span>Job Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                    <Target className="w-4 h-4" />
                    <span>Requirements:</span>
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      "5+ years of experience in frontend development",
                      "Proficiency in React, TypeScript, and modern JavaScript",
                      "Experience with Next.js and server-side rendering",
                      "Strong understanding of responsive design and CSS frameworks",
                      "Experience with version control systems (Git)",
                    ].map((requirement, index) => (
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
                    <Award className="w-4 h-4" />
                    <span>Responsibilities:</span>
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    {[
                      "Develop and maintain high-quality frontend applications",
                      "Collaborate with design and backend teams to implement user interfaces",
                      "Optimize applications for maximum speed and scalability",
                      "Write clean, maintainable, and well-documented code",
                      "Participate in code reviews and technical discussions",
                      "Stay up-to-date with the latest frontend technologies and best practices",
                    ].map((responsibility, index) => (
                      <li
                        key={index}
                        className={`animate-in fade-in slide-in-from-right-2 duration-500 delay-[1200 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-gray-50 p-2 rounded-lg text-sm sm:text-base`}
                      >
                        • {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Right Sidebar */}
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
                  className="mb-6 transition-all duration-300 focus:ring-2 focus:ring-[#B01FCE]/50 focus:scale-[1.02]"
                  placeholder="Enter your suggestions for the cover letter"
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                />
                <Button
                  className="w-full bg-[#B01FCE] hover:bg-white hover:text-[#B01FCE] transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    "Generate Cover Letter"
                  )}
                </Button>
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
                        stroke="#4A90A4"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="0 251.2"
                        strokeLinecap="round"
                        style={{
                          transition: "stroke-dasharray 2s ease-out",
                          strokeDasharray: animateProgress
                            ? `${90 * 2.51} 251.2`
                            : "0 251.2",
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-1000 delay-1200">
                      <span className="text-3xl font-bold text-[#4A90A4] transition-all duration-300 group-hover:scale-110">
                        90%
                      </span>
                      <span className="text-xs text-[#B01FCE] font-medium">
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
                    {[
                      { name: "React Experience", score: 95, color: "#10b981" },
                      { name: "TypeScript", score: 90, color: "#3b82f6" },
                      { name: "Frontend Skills", score: 88, color: "#8b5cf6" },
                    ].map((skill, index) => (
                      <div
                        key={skill.name}
                        className="group/skill hover:scale-[1.02] transition-transform duration-300"
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span className="transition-colors duration-300 group-hover/skill:font-medium">
                            {skill.name}
                          </span>
                          <span
                            className="font-medium transition-all duration-300 group-hover/skill:scale-110"
                            style={{ color: skill.color }}
                          >
                            {animateProgress ? skill.score : 0}%
                          </span>
                        </div>
                        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden transition-all duration-300 group-hover/skill:h-3">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: skill.color,
                              width: animateProgress ? `${skill.score}%` : "0%",
                              transition: `width 1.5s ease-out ${
                                index * 0.3 + 1
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
                    {[
                      "Add Next.js project examples",
                      "Include performance optimization experience",
                      "Highlight team leadership skills",
                    ].map((improvement, index) => (
                      <li
                        key={index}
                        className={`animate-in fade-in slide-in-from-right-2 duration-500 delay-[1500 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-orange-50 p-2 rounded-lg`}
                      >
                        •{" "}
                        <span className="transition-colors duration-300 group-hover/item:text-orange-700">
                          {improvement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Analysis Explanation */}
            <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
              <CardHeader>
                <CardTitle className="transition-colors duration-300 group-hover:text-[#4A90A4]">
                  Analysis Explanation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                  CV Anda sangat cocok dengan posisi ini karena memiliki
                  pengalaman yang relevan dalam pengembangan frontend
                  menggunakan React dan TypeScript. Keahlian teknis yang Anda
                  miliki sesuai dengan kebutuhan perusahaan.
                </p>

                <div>
                  <h4 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-[#FF8A50]">
                    Suggestions:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {[
                      "Tambahkan contoh proyek menggunakan Next.js",
                      "Sertakan pengalaman optimasi performa aplikasi",
                      "Highlight kemampuan kepemimpinan tim",
                      "Tambahkan sertifikasi React atau frontend development",
                    ].map((suggestion, index) => (
                      <li
                        key={index}
                        className={`animate-in fade-in slide-in-from-left-2 duration-300 delay-[800 + index * 100}ms] hover:scale-105 transition-all duration-300 group/item cursor-pointer hover:bg-orange-50 p-1 rounded`}
                      >
                        •{" "}
                        <span className="transition-colors duration-300 group-hover/item:text-orange-700">
                          {suggestion}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-[#4A90A4]">
                    Skills Analysis:
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { name: "React.js", score: 95, color: "#10b981" },
                      { name: "TypeScript", score: 90, color: "#3b82f6" },
                      { name: "Next.js", score: 70, color: "#f59e0b" },
                      { name: "CSS/Styling", score: 85, color: "#8b5cf6" },
                    ].map((skill, index) => (
                      <div
                        key={skill.name}
                        className="flex justify-between hover:scale-105 transition-transform duration-300 group/item cursor-pointer p-1 rounded"
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span
                          className="font-medium"
                          style={{ color: skill.color }}
                        >
                          {animateProgress ? skill.score : 0}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
