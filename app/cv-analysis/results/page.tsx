import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"

export default function CVAnalysisResultsPage() {
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
            <Link href="/cv-analysis">
              <Button variant="outline">Upload New CV</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">Find Jobs</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload CV</TabsTrigger>
            <TabsTrigger value="results">Analysis CV Result</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-8">
            {/* Overall Score */}
            <Card>
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
            <Card>
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

            <div className="grid md:grid-cols-2 gap-8">
              {/* CV Strengths */}
              <Card>
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
              <Card>
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
            <Card>
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
