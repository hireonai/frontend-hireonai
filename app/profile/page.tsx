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
import { User, MapPin, FileText, Calendar, ChevronDown, Lock, Menu, X, ArrowRight, ExternalLink } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-orange-500"
    return "bg-red-500"
  }

  const getMatchScoreBorderColor = (score: number) => {
    if (score >= 90) return "border-l-green-500"
    if (score >= 80) return "border-l-blue-500"
    if (score >= 70) return "border-l-orange-500"
    return "border-l-red-500"
  }

  const getMatchScoreGlow = (score: number) => {
    if (score >= 90) return "shadow-green-500/30"
    if (score >= 80) return "shadow-blue-500/30"
    if (score >= 70) return "shadow-orange-500/30"
    return "shadow-red-500/30"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img src="/hireon-logo.png" alt="hireon-logo" className="h-8 w-auto align-middle transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                HireOn.AI
              </span>
            </Link>
          </div>
          <div className="flex-grow flex justify-center">
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/cv-analysis" className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group">
                CV-Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group">
                Job-list
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="hidden sm:block">
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
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-300">
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 lg:hidden">
                  <Link href="/" className="w-full">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 lg:hidden">
                  <Link href="/cv-analysis" className="w-full">CV Analysis</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 lg:hidden">
                  <Link href="/dashboard" className="w-full">Job List</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 sm:hidden">
                  <Link href="/dashboard" className="w-full">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* User Header */}
        <Card className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
              <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105 flex-shrink-0">
                <User className="w-10 sm:w-12 h-10 sm:h-12 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Erika Erfina</h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-2">Senior Machine Learning Engineer</p>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Cilayem, Depok</span>
                </div>
                <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                  <Lock className="w-4 h-4 mr-2" />
                  Lock More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Personal Information */}
            <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <CardTitle className="text-xl lg:text-2xl">Personal Information</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue="Erika Erfina"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      defaultValue="Cilayem, Depok"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="erika.erfina@email.com"
                      disabled={!isEditing}
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
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
                <CardTitle className="text-xl lg:text-2xl">Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-sm font-medium">Last Education</Label>
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
                  <Label htmlFor="preferredLocation" className="text-sm font-medium">Preferred Location</Label>
                  <Input
                    id="preferredLocation"
                    defaultValue="Jakarta, Indonesia"
                    disabled={!isEditing}
                    className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobCategories" className="text-sm font-medium">Job Categories of Interest</Label>
                  <Textarea
                    id="jobCategories"
                    defaultValue="Machine Learning, Data Science, AI Research, Software Engineering"
                    disabled={!isEditing}
                    rows={3}
                    className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            {/* My CV */}
            <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">My CV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 mb-4 transition-all duration-300 hover:bg-gray-50 hover:border-[#4A90A4]/30">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-8 h-8 text-[#4A90A4] transition-transform duration-300 hover:scale-110 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">Main-Resume-2025.pdf</p>
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span>Updated: Jan 15, 2025</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Replace
                  </Button>
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Upload New CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedJobs.map((job, index) => (
                  <Link 
                    key={index}
                    href={`/jobs/${job.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <div
                      className={`border rounded-lg p-4 border-l-4 ${getMatchScoreBorderColor(job.matchScore)} 
                        transition-all duration-500 hover:shadow-xl hover:scale-[1.03] group cursor-pointer
                        hover:border-[#4A90A4] hover:shadow-[#4A90A4]/10 hover:-translate-y-1 transform
                        relative overflow-hidden`}
                      style={{
                        animationDelay: `${500 + index * 100}ms`,
                      }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 via-transparent to-[#FF8A50]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Click indicator */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0 z-20">
                        <div className="bg-[#4A90A4] text-white p-1.5 rounded-full shadow-lg">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>

                      <div className="relative z-10 pr-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center ${getMatchScoreColor(
                              job.matchScore,
                            )} transition-all duration-500 group-hover:scale-125 group-hover:shadow-xl ${getMatchScoreGlow(job.matchScore)} flex-shrink-0 group-hover:animate-pulse relative z-10`}
                          >
                            <span className="text-white font-bold text-xs sm:text-sm">{job.matchScore}%</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium mb-1 transition-colors duration-300 group-hover:text-[#4A90A4] text-sm sm:text-base truncate group-hover:translate-x-1 transform">
                              {job.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700 truncate font-medium">
                              {job.company}
                            </p>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
                
                          </div>
                        </div>

                        {/* Progress bar at bottom */}
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
                          <div 
                            className={`h-1 rounded-full transition-all duration-700 ${getMatchScoreColor(job.matchScore).replace('bg-', 'bg-')} transform scale-x-0 group-hover:scale-x-100 origin-left`}
                            style={{ width: `${job.matchScore}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Bottom border animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </Link>
                ))}

                <Link href="/dashboard">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base group relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      View All Saved Jobs
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/10 to-[#FF8A50]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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