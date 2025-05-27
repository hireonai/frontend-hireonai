import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, Users, Target, Shield } from "lucide-react"

export default function CVAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#4A90A4] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-gray-900">HireOn.AI</span>
            </Link>

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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CV Analysis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get AI-powered feedback on your CV with detailed insights and improvement suggestions to boost your job
            search success.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-12">
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

              <Link href="/cv-analysis/results">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-12">
                  CV Analysis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Alert className="mb-12 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Privacy Guarantee:</strong> Your CV is processed securely and never shared with third parties. All
            data is encrypted and automatically deleted after analysis.
          </AlertDescription>
        </Alert>

        {/* What's Next Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">{"What's Next?"}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
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

            <Card className="text-center hover:shadow-lg transition-shadow">
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

            <Card className="text-center hover:shadow-lg transition-shadow">
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
    </div>
  )
}
