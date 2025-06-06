"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Upload,
  FileText,
  Users,
  Target,
  Shield,
  ChevronDown,
  User,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CVAnalysisPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgressValue, setShowProgressValue] = useState(false);

  // Add state to track when to show progress animations
  const [animateProgress, setAnimateProgress] = useState(false);

  const handleAnalyze = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setActiveTab("results");
            // Trigger progress animations when results tab is shown
            setTimeout(() => setAnimateProgress(true), 500);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Reset animation state when switching back to upload tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "upload") {
      setAnimateProgress(false);
    } else if (value === "results") {
      // Delay animation start when switching to results tab
      setTimeout(() => setAnimateProgress(true), 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header with animations */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/hireon-logo.png"
                alt="hireon-logo"
                className="h-8 w-auto align-middle transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                HireOn.AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-900 hover:text-[#4A90A4] font-medium relative group"
              >
                Job list
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/cv-analysis"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                CV Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="animate-in slide-in-from-top-2 duration-300"
            >
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                <Link href="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                <Link href="/dashboard" className="w-full">
                  Job List
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Enhanced Tabs with animations */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 transition-all duration-300 hover:shadow-md">
            <TabsTrigger
              value="upload"
              className="transition-all duration-300 data-[state=active]:bg-[#4A90A4] data-[state=active]:text-white hover:scale-105"
            >
              Upload CV
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="transition-all duration-300 data-[state=active]:bg-[#4A90A4] data-[state=active]:text-white hover:scale-105"
            >
              Analysis Results
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Upload Section */}
          <TabsContent
            value="upload"
            className="data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in data-[state=active]:slide-in-from-bottom-4 duration-500"
          >
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Animated Header */}
              <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 transition-colors duration-300 hover:text-[#4A90A4]">
                  CV Analysis
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:scale-105">
                  Get AI-powered feedback on your CV with detailed insights and
                  improvement suggestions to boost your job search success.
                </p>
              </div>

              {/* Enhanced Upload Card */}
              <Card className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                <CardContent className="p-12 relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 via-transparent to-[#FF8A50]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="text-center relative z-10">
                    {/* Animated Upload Icon */}
                    <div className="w-24 h-24 bg-[#4A90A4] rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-[#4A90A4]/30 group-hover:rotate-12">
                      <Upload className="w-12 h-12 text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <h2 className="text-2xl font-semibold mb-4 transition-colors duration-300 group-hover:text-[#4A90A4]">
                      Upload your CV
                    </h2>
                    <p className="text-gray-600 mb-8 transition-colors duration-300 group-hover:text-gray-700">
                      Drag and drop your CV file here or click to browse. We
                      support PDF, DOC, and DOCX formats.
                    </p>

                    {/* Enhanced Drop Zone */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 hover:border-[#4A90A4] transition-all duration-300 hover:bg-gray-50 hover:shadow-lg group-hover:scale-105 cursor-pointer">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4 transition-all duration-300 hover:text-[#4A90A4] hover:scale-110" />
                      <p className="text-gray-600 mb-4 transition-colors duration-300">
                        Drop your CV here or click to upload
                      </p>
                      <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        Choose File
                      </Button>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#4A90A4]">
                            Analyzing CV...
                          </span>
                          <span className="text-sm font-medium text-[#4A90A4]">
                            {uploadProgress}%
                          </span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {/* Enhanced Analyze Button */}
                    <Button
                      size="lg"
                      className="bg-[#163756] hover:bg-[#D1E8EC] hover:text-[#4A90A4] px-12 transition-all duration-500 hover:scale-110 hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                      onClick={handleAnalyze}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        "CV Analysis"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Privacy Notice */}
              <Alert className="mb-12 border-blue-200 bg-blue-50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
                <Shield className="h-4 w-4 text-blue-600 animate-pulse" />
                <AlertDescription className="text-blue-800">
                  <strong>Privacy Guarantee:</strong> Your CV is processed
                  securely and never shared with third parties. All data is
                  encrypted and automatically deleted after analysis.
                </AlertDescription>
              </Alert>

              {/* Enhanced What's Next Section */}
              <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
                <h2 className="text-3xl font-bold text-center mb-8 transition-colors duration-300 hover:text-[#4A90A4]">
                  {"What's Next?"}
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Enhanced Feature Cards */}
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-800 group cursor-pointer hover:scale-[1.05] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-[#FF8A50]/30">
                        <FileText className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-[#FF8A50]">
                        Cover Letter Generator
                      </h3>
                      <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-gray-700">
                        Generate your own cover letter for each job application
                        in seconds with AI-powered personalization.
                      </p>
                      <Button
                        variant="outline"
                        className="w-full transition-all duration-300 hover:scale-105 group-hover:border-[#FF8A50] group-hover:text-[#FF8A50]"
                      >
                        Generate Cover Letter
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-[1000ms] group cursor-pointer hover:scale-[1.05] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-[#4A90A4] rounded-lg flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-[#4A90A4]/30">
                        <Target className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-[#4A90A4]">
                        Job Matching
                      </h3>
                      <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-gray-700">
                        Discover relevant matching jobs with AI-powered scoring
                        based on your CV and preferences.
                      </p>
                      <Link href="/dashboard">
                        <Button
                          variant="outline"
                          className="w-full transition-all duration-300 hover:scale-105 group-hover:border-[#4A90A4] group-hover:text-[#4A90A4]"
                        >
                          Find Jobs
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 delay-[1200ms] group cursor-pointer hover:scale-[1.05] hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A50]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-[#FF8A50]/30">
                        <Users className="w-8 h-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 transition-colors duration-300 group-hover:text-[#FF8A50]">
                        Career Profile
                      </h3>
                      <p className="text-gray-600 mb-6 transition-colors duration-300 group-hover:text-gray-700">
                        Update your professional career goals to improve job
                        recommendations and match accuracy.
                      </p>
                      <Link href="/profile">
                        <Button
                          variant="outline"
                          className="w-full transition-all duration-300 hover:scale-105 group-hover:border-[#FF8A50] group-hover:text-[#FF8A50]"
                        >
                          Update Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Analysis Results */}
          <TabsContent
            value="results"
            className="data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in data-[state=active]:slide-in-from-bottom-4 duration-500"
          >
            <div className="space-y-8">
              {/* Enhanced Overall Score with Animated Circle */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-all duration-500 hover:shadow-2xl group">
                <CardHeader>
                  <CardTitle className="text-2xl transition-colors duration-300 group-hover:text-[#4A90A4]">
                    CV Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative w-48 h-48 group-hover:scale-105 transition-transform duration-500">
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
                          strokeDasharray={`${78 * 2.51} 251.2`}
                          strokeLinecap="round"
                          className="animate-in slide-in-from-bottom-4 duration-2000 delay-500"
                          style={{
                            animation: "drawCircle 2s ease-out forwards",
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-1000 delay-1000">
                        <span className="text-4xl font-bold text-[#4A90A4] transition-all duration-300 group-hover:scale-110">
                          78%
                        </span>
                        <span className="text-sm text-gray-600">
                          Overall Score
                        </span>
                        <Badge
                          variant="secondary"
                          className="mt-2 transition-all duration-300 group-hover:scale-105"
                        >
                          Match
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Score Breakdown */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      name: "Technical Skills",
                      score: 85,
                      color: "#4A90A4",
                      delay: 600,
                    },
                    {
                      name: "Experience Relevance",
                      score: 90,
                      color: "#FF8A50",
                      delay: 700,
                    },
                    {
                      name: "Education",
                      score: 85,
                      color: "#FF8A50",
                      delay: 800,
                    },
                    {
                      name: "Achievement",
                      score: 60,
                      color: "#FF8A50",
                      delay: 900,
                    },
                  ].map((item, index) => (
                    <div
                      key={item.name}
                      className={`animate-in fade-in slide-in-from-left-4 duration-500 delay-[${item.delay}ms] group hover:scale-[1.02] transition-transform duration-300`}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium transition-colors duration-300 group-hover:text-gray-900">
                          {item.name}
                        </span>
                        <span
                          className={`font-semibold transition-all duration-300 group-hover:scale-110 ${
                            animateProgress ? "animate-count-up" : ""
                          }`}
                          style={{ color: item.color }}
                          data-value={item.score}
                        >
                          {animateProgress ? item.score : 0}%
                        </span>
                      </div>
                      <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden transition-all duration-300 group-hover:h-4">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: item.color,
                            width: animateProgress ? `${item.score}%` : "0%",
                            transition: `width 1.5s ease-out ${index * 0.2}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Enhanced CV Strengths */}
                <Card className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-600 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 transition-transform duration-300 group-hover:scale-125" />
                      <span className="transition-colors duration-300 group-hover:text-green-600">
                        CV Strengths
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Strong technical skills section with relevant technologies",
                        "Clear work experience progression",
                        "Good educational background",
                        "Professional formatting and layout",
                      ].map((strength, index) => (
                        <li
                          key={index}
                          className={`flex items-start space-x-2 animate-in fade-in slide-in-from-left-2 duration-500 delay-[${
                            800 + index * 100
                          }ms] hover:scale-105 transition-transform duration-300 group/item`}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm transition-colors duration-300 group-hover/item:text-green-700">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Enhanced Areas for Improvement */}
                <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-800 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600 transition-transform duration-300 group-hover:scale-125" />
                      <span className="transition-colors duration-300 group-hover:text-orange-600">
                        Areas for Improvement
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Add more quantifiable achievements and metrics",
                        "Include relevant certifications or courses",
                        "Expand on project descriptions and impact",
                        "Add keywords relevant to target positions",
                      ].map((improvement, index) => (
                        <li
                          key={index}
                          className={`flex items-start space-x-2 animate-in fade-in slide-in-from-right-2 duration-500 delay-[1000 + index * 100}ms] hover:scale-105 transition-transform duration-300 group/item`}
                        >
                          <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-125" />
                          <span className="text-sm transition-colors duration-300 group-hover/item:text-orange-700">
                            {improvement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Section Analysis */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1000ms] transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle>Section-by-Section Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      title: "Work Experience",
                      description:
                        "Your work experience section shows good progression and relevant roles. Consider adding more specific achievements and quantifiable results to strengthen this section.",
                      score: 85,
                      color: "#4A90A4",
                      delay: 1200,
                    },
                    {
                      title: "Education",
                      description:
                        "Strong educational background with relevant degree. Consider adding any relevant coursework, projects, or academic achievements.",
                      score: 85,
                      color: "#FF8A50",
                      delay: 1300,
                    },
                    {
                      title: "Skills",
                      description:
                        "Excellent technical skills coverage with modern technologies. Consider organizing skills by category and adding proficiency levels.",
                      score: 90,
                      color: "#4A90A4",
                      delay: 1400,
                    },
                    {
                      title: "Achievements",
                      description:
                        "This section needs improvement. Add specific accomplishments, awards, or notable projects with measurable impact and results.",
                      score: 60,
                      color: "#f59e0b",
                      delay: 1500,
                    },
                  ].map((section, index) => (
                    <div
                      key={section.title}
                      className={`border-l-4 pl-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-[${section.delay}ms] hover:scale-[1.02] transition-all duration-300 group cursor-pointer hover:shadow-lg hover:bg-gray-50 p-4 rounded-r-lg`}
                      style={{ borderLeftColor: section.color }}
                    >
                      <h4 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-gray-900">
                        {section.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2 transition-colors duration-300 group-hover:text-gray-700">
                        {section.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <TrendingUp
                          className="w-4 h-4 transition-all duration-300 group-hover:scale-125"
                          style={{ color: section.color }}
                        />
                        <span
                          className="text-sm font-medium transition-all duration-300 group-hover:scale-105"
                          style={{ color: section.color }}
                        >
                          Score: {section.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add CSS for custom animations */}
      <style jsx>{`
        @keyframes drawCircle {
          from {
            stroke-dasharray: 0 251.2;
          }
          to {
            stroke-dasharray: ${78 * 2.51} 251.2;
          }
        }

        @keyframes progressAnimation {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes countUp {
          from {
            content: "0%";
          }
          to {
            content: attr(data-value) "%";
          }
        }

        .animate-count-up {
          animation: countUp 1.5s forwards;
        }
      `}</style>
    </div>
  );
}
