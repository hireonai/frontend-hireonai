import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, DollarSign, Clock, CheckCircle, FileText, TrendingUp, AlertTriangle } from "lucide-react"

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
          <img src="/hireon-logo.png" alt="hireon Logo" className="h-8 w-auto align-middle" />
          <span className="text-xl font-bold text-gray-900">HireOn.AI</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Senior Frontend Developer</h1>
                    <p className="text-xl text-gray-600 mb-4">TechCorp Solutions</p>
                    <div className="flex items-center space-x-6 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>Jakarta Pusat</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>50-100 Employees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>$60,000 - $80,000</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Full-time</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-[#4A90A4] text-white">90% Match</Badge>
                </div>

                <div className="flex space-x-4">
                  <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 px-8">Apply Now</Button>
                  <Button variant="outline">Save Job</Button>
                </div>
              </CardContent>
            </Card>

            {/* Company Description */}
            <Card>
              <CardHeader>
                <CardTitle>About TechCorp Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  <strong>Technology and Software Solutions - Bringin Inti Teknologi</strong>
                </p>
                <p className="text-gray-700 leading-relaxed">
                  TechCorp Solutions is a leading technology company specializing in innovative software solutions for
                  businesses across various industries. We are committed to delivering cutting-edge technology that
                  drives digital transformation and helps our clients achieve their business objectives. Our team of
                  talented professionals works in a collaborative environment that fosters creativity, innovation, and
                  professional growth.
                </p>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Requirements:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>5+ years of experience in frontend development</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Proficiency in React, TypeScript, and modern JavaScript</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Experience with Next.js and server-side rendering</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Strong understanding of responsive design and CSS frameworks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Experience with version control systems (Git)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Responsibilities:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Develop and maintain high-quality frontend applications</li>
                    <li>• Collaborate with design and backend teams to implement user interfaces</li>
                    <li>• Optimize applications for maximum speed and scalability</li>
                    <li>• Write clean, maintainable, and well-documented code</li>
                    <li>• Participate in code reviews and technical discussions</li>
                    <li>• Stay up-to-date with the latest frontend technologies and best practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Competitive salary package</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Health insurance coverage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Flexible working hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Remote work options</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Professional development budget</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Annual performance bonus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Cover Letter Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-[#4A90A4]" />
                  <span>AI Cover Letter Generator</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Generate a personalized cover letter for this position using AI.
                </p>
                <Button className="w-full bg-[#B01FCE] hover:bg-white/90 hover:text-[#B01FCE]">Generate Cover Letter</Button>
              </CardContent>
            </Card>

            {/* CV Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>CV Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4A90A4] mb-2">90%</div>
                  <p className="text-sm text-gray-600">Match Score</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>Your Strengths</span>
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>React Experience</span>
                        <span className="text-green-600">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>TypeScript</span>
                        <span className="text-green-600">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Frontend Skills</span>
                        <span className="text-green-600">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span>Areas for Improvement</span>
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Add Next.js project examples</li>
                    <li>• Include performance optimization experience</li>
                    <li>• Highlight team leadership skills</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CV Analysis Result with Explanation */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Explanation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">
                  CV Anda sangat cocok dengan posisi ini karena memiliki pengalaman yang relevan dalam pengembangan
                  frontend menggunakan React dan TypeScript. Keahlian teknis yang Anda miliki sesuai dengan kebutuhan
                  perusahaan.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Suggestions:</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Tambahkan contoh proyek menggunakan Next.js</li>
                    <li>• Sertakan pengalaman optimasi performa aplikasi</li>
                    <li>• Highlight kemampuan kepemimpinan tim</li>
                    <li>• Tambahkan sertifikasi React atau frontend development</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills Analysis:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>React.js</span>
                      <span className="text-green-600 font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TypeScript</span>
                      <span className="text-green-600 font-medium">90%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next.js</span>
                      <span className="text-orange-600 font-medium">70%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CSS/Styling</span>
                      <span className="text-green-600 font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
