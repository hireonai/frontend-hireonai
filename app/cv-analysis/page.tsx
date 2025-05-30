"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, Users, Target, Shield } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { useState } from "react"

export default function CVAnalysisPage() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
            <img src="/hireon-logo.png" alt="hireon Logo" className="h-8 w-auto align-middle" />
            <span className="text-xl font-bold text-gray-900">HireOn.AI</span>
            </Link>
          </div>

          {/* Added a div to wrap the nav menu and give it flex-grow to take available space */}
          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#4A90A4]">
                Home
              </Link>
              <Link href="/cv-analysis" className="text-gray-700 hover:text-[#4A90A4] font-medium text-[#4A90A4]">
                CV-Analysis
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-[#4A90A4]">
                Job-list
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Added Tabs component for Upload and Results */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload CV</TabsTrigger>
            <TabsTrigger value="results">Analysis CV Result</TabsTrigger>
          </TabsList>

          {/* Upload Section - Moved from original page.tsx */}
          <TabsContent value="upload" className="data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in">
            {/* Main content container for the upload tab with entry animation */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Analysis</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get AI-powered feedback on your CV with detailed insights and improvement suggestions to boost your job
                  search success.
                </p>
              </div>

              <Card className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <CardContent className="p-12">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#4A90A4] rounded-full flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-12 h-12 text-white" />
                    </div>

                    <h2 className="text-2xl font-semibold mb-4">Upload your CV</h2>
                    <p className="text-gray-600 mb-8">
                      Drag and drop your CV file here or click to browse. We support PDF, DOC, and DOCX formats.
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6 hover:border-[#4A90A4] transition-colors">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Drop your CV here or click to upload</p>
                      <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">Choose File</Button>
                    </div>

                    {/* Button to trigger analysis and switch to results tab */}
                    <Button size="lg" className="bg-[#163756] hover:bg-[#D1E8EC] hover:text-[#4A90A4] px-12" onClick={() => setActiveTab("results")}>
                      CV Analysis
                    </Button>

                  </div>
                </CardContent>
              </Card>

              {/* Privacy Notice - Moved from original page.tsx */}
              <Alert className="mb-12 border-blue-200 bg-blue-50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Privacy Guarantee:</strong> Your CV is processed securely and never shared with third parties. All
                  data is encrypted and automatically deleted after analysis.
                </AlertDescription>
              </Alert>

              {/* What's Next Section - Moved from original page.tsx */}
              <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
                <h2 className="text-3xl font-bold text-center mb-8">{"What's Next?"}</h2>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Cover Letter Generator</h3>
                      <p className="text-gray-600 mb-6">
                        Generate your own cover letter for each job application in seconds with AI-powered personalization.
                      </p>
                      <Button variant="outline" className="w-full">
                        Generate Cover Letter
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1000ms]">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#4A90A4] rounded-lg flex items-center justify-center mx-auto mb-6">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Job Matching</h3>
                      <p className="text-gray-600 mb-6">
                        Discover relevant matching jobs with AI-powered scoring based on your CV and preferences.
                      </p>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full">
                          Find Jobs
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1200ms]">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4">Career Profile</h3>
                      <p className="text-gray-600 mb-6">
                        Update your professional career goals to improve job recommendations and match accuracy.
                      </p>
                      <Link href="/profile">
                        <Button variant="outline" className="w-full">
                          Update Profile
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Analysis Results Content - Will be copied from results page */}
          <TabsContent value="results" className="data-[state=active]:animate-in data-[state=inactive]:animate-out data-[state=inactive]:fade-out data-[state=active]:fade-in">
            {/* Content from app/cv-analysis/results/page.tsx will go here */}
            {/* Overall Score */}
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <CardHeader>
                <CardTitle className="text-2xl">CV Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#4A90A4"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${78 * 2.51} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-[#4A90A4]">78%</span>
                      <span className="text-sm text-gray-600">Overall Score</span>
                      <Badge variant="secondary" className="mt-2">
                        Match
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <CardHeader>
                <CardTitle>Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Technical Skills</span>
                    <span className="text-[#4A90A4] font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Experience Relevance</span>
                    <span className="text-[#FF8A50] font-semibold">90%</span>
                  </div>
                  <Progress value={90} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Education</span>
                    <span className="text-[#FF8A50] font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Achievement</span>
                    <span className="text-[#FF8A50] font-semibold">60%</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
              {/* CV Strengths */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>CV Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Strong technical skills section with relevant technologies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Clear work experience progression</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Good educational background</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Professional formatting and layout</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Add more quantifiable achievements and metrics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Include relevant certifications or courses</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Expand on project descriptions and impact</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Add keywords relevant to target positions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section Analysis */}
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1000ms]">
              <CardHeader>
                <CardTitle>Section-by-Section Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-4 border-[#4A90A4] pl-4">
                  <h4 className="font-semibold mb-2">Work Experience</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Your work experience section shows good progression and relevant roles. Consider adding more
                    specific achievements and quantifiable results to strengthen this section.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-[#4A90A4]" />
                    <span className="text-sm font-medium text-[#4A90A4]">Score: 85%</span>
                  </div>
                </div>

                <div className="border-l-4 border-[#FF8A50] pl-4">
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Strong educational background with relevant degree. Consider adding any relevant coursework,
                    projects, or academic achievements.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-[#FF8A50]" />
                    <span className="text-sm font-medium text-[#FF8A50]">Score: 85%</span>
                  </div>
                </div>

                <div className="border-l-4 border-[#4A90A4] pl-4">
                  <h4 className="font-semibold mb-2">Skills</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Excellent technical skills coverage with modern technologies. Consider organizing skills by category
                    and adding proficiency levels.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-[#4A90A4]" />
                    <span className="text-sm font-medium text-[#4A90A4]">Score: 90%</span>
                  </div>
                </div>

                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold mb-2">Achievements</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    This section needs improvement. Add specific accomplishments, awards, or notable projects with
                    measurable impact and results.
                  </p>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-orange-400">Score: 60%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
