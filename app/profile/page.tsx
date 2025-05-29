"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, MapPin, FileText, Calendar, ChevronDown, Lock } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const savedJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      matchScore: 95,
    },
    {
      title: "ML Engineer",
      company: "DataTech Inc",
      matchScore: 82,
    },
    {
      title: "Data Scientist",
      company: "AI Solutions Ltd",
      matchScore: 68,
    },
  ]

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500" // Green for 90%+
    if (score >= 80) return "bg-blue-500" // Blue for 80%+
    if (score >= 70) return "bg-orange-500" // Orange for 70%+
    return "bg-red-500" // Red for below 70%
  }

  const getMatchScoreBorderColor = (score: number) => {
    if (score >= 90) return "border-l-green-500" // Green border
    if (score >= 80) return "border-l-blue-500" // Blue border
    if (score >= 70) return "border-l-orange-500" // Orange border
    return "border-l-red-500" // Red border
  }

  const getMatchScoreGlow = (score: number) => {
    if (score >= 90) return "shadow-green-500/30" // Green glow
    if (score >= 80) return "shadow-blue-500/30" // Blue glow
    if (score >= 70) return "shadow-orange-500/30" // Orange glow
    return "shadow-red-500/30" // Red glow
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <img src="/hireon-logo.png" alt="hireon-logo" className="h-8 w-auto align-middle transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#4A90A4]">
                HireOn.AI
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/cv-analysis"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                CV-Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                Job-list
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="transition-all duration-300 hover:scale-105">
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <User className="w-4 h-4" />
                  </div>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-300">
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Header */}
        <Card className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Erika Erfina</h1>
                <p className="text-xl text-gray-600 mb-2">Senior Machine Learning Engineer</p>
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Cilayem, Depok</span>
                </div>
                <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <Lock className="w-4 h-4 mr-2" />
                  Lock More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue="Erika Erfina"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      defaultValue="Cilayem, Depok"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="erika.erfina@email.com"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue="+62 812-3456-7890"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Preferences */}
            <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Last Education</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20">
                      <SelectValue placeholder="Master's Degree in Computer Science" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">Preferred Location</Label>
                  <Input
                    id="preferredLocation"
                    defaultValue="Jakarta, Indonesia"
                    disabled={!isEditing}
                    className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobCategories">Job Categories of Interest</Label>
                  <Textarea
                    id="jobCategories"
                    defaultValue="Machine Learning, Data Science, AI Research, Software Engineering"
                    disabled={!isEditing}
                    rows={3}
                    className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* My CV */}
            <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>My CV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 mb-4 transition-all duration-300 hover:bg-gray-50 hover:border-[#4A90A4]/30">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-[#4A90A4] transition-transform duration-300 hover:scale-110" />
                    <div className="flex-1">
                      <p className="font-medium">Main-Resume-2025.pdf</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Updated: Jan 15, 2025
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105">
                    Replace
                  </Button>
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105">
                    Upload New CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedJobs.map((job, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 border-l-4 ${getMatchScoreBorderColor(job.matchScore)} 
                      transition-all duration-500 hover:shadow-lg hover:scale-[1.02] group cursor-pointer`}
                    style={{
                      animationDelay: `${500 + index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getMatchScoreColor(
                          job.matchScore,
                        )} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${getMatchScoreGlow(job.matchScore)}`}
                      >
                        <span className="text-white font-bold text-sm">{job.matchScore}%</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1 transition-colors duration-300 group-hover:text-[#4A90A4]">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Apply Now
                    </Button>
                  </div>
                ))}

                <Link href="/dashboard">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105">
                    View All Saved Jobs
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