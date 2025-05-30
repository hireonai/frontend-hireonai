"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Upload, MapPin, Clock, DollarSign, ChevronDown, User, Bell, Filter, X } from "lucide-react"

export default function DashboardPage() {
  const [salaryRange, setSalaryRange] = useState([0])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const jobCategories = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Data Science",
    "DevOps",
    "UI/UX Design",
    "Product Management",
  ]

  const jobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      salary: "$60,000 - $80,000",
      posted: "2 days ago",
      matchScore: 95,
    },
    {
      title: "Machine Learning Engineer",
      company: "DataTech Inc",
      location: "Bandung, Indonesia",
      type: "Full-time",
      salary: "$55,000 - $75,000",
      posted: "3 days ago",
      matchScore: 87,
    },
    {
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Contract",
      salary: "$50,000 - $70,000",
      posted: "1 day ago",
      matchScore: 82,
    },
    {
      title: "Backend Developer",
      company: "TechCorp Solutions",
      location: "Jakarta, Indonesia",
      type: "Full-time",
      salary: "$45,000 - $65,000",
      posted: "4 days ago",
      matchScore: 75,
    },
    {
      title: "Data Scientist",
      company: "AI Solutions Ltd",
      location: "Surabaya, Indonesia",
      type: "Full-time",
      salary: "$60,000 - $85,000",
      posted: "1 week ago",
      matchScore: 68,
    },
    {
      title: "UI/UX Designer",
      company: "Creative Agency",
      location: "Yogyakarta, Indonesia",
      type: "Part-time",
      salary: "$30,000 - $45,000",
      posted: "5 days ago",
      matchScore: 55,
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

  const FilterSection = () => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        {/* Mobile Filter Header */}
        <div className="flex items-center justify-between lg:hidden">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Upload CV Section */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Upload CV</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center transition-all duration-300 hover:border-[#4A90A4] hover:bg-gray-50 group">
            <Upload className="w-6 lg:w-8 h-6 lg:h-8 text-gray-400 mx-auto mb-2 transition-all duration-300 group-hover:text-[#4A90A4] group-hover:scale-110" />
            <p className="text-xs lg:text-sm text-gray-600 mb-2">Drag & drop your CV here</p>
            <Button variant="outline" size="sm" className="bg-[#163B56] text-white hover:bg-white hover:text-[#163B56] transition-all duration-300 hover:scale-105 text-xs lg:text-sm">
              Browse Files
            </Button>
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Salary Range</h3>
          <div className="space-y-4">
            <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              max={70000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-xs lg:text-sm text-gray-600">
              <span>$0</span>
              <span className="font-medium text-[#4A90A4]">${salaryRange[0].toLocaleString()}</span>
              <span>$70,000</span>
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Experience Level</h3>
          <Select>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fresh">Fresh Graduate</SelectItem>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Job Categories</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {jobCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2 group">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category])
                    } else {
                      setSelectedCategories(selectedCategories.filter((c) => c !== category))
                    }
                  }}
                  className="transition-all duration-300"
                />
                <label htmlFor={category} className="text-xs lg:text-sm text-gray-700 cursor-pointer transition-colors duration-300 group-hover:text-[#4A90A4]">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Company Industry */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">Company Industry</h3>
          <Select>
            <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img src="/hireon-logo.png" alt="hireon-logo" className="h-8 w-auto align-middle transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#4A90A4]">HireOn.AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/cv-analysis" className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group">
                CV-Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/dashboard" className="text-gray-900 hover:text-[#4A90A4] font-medium relative group">
                Job-list
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-300">
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                <Link href="/" className="w-full">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                <Link href="/cv-analysis" className="w-full">CV Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                <Link href="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">Settings</DropdownMenuItem>
              <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Job Match Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Discover personalized job opportunities with our AI-powered scoring system</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-focus-within:text-[#4A90A4]" />
              <Input placeholder="Search for jobs, companies, or skills..." className="pl-10 h-12 transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4]" />
            </div>
            <div className="flex gap-2">
              <Button className="h-12 px-6 lg:px-8 bg-[#FF8A50] hover:bg-[#FF8A50]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 sm:flex-initial">
                Search Jobs
              </Button>
              <Button 
                variant="outline" 
                className="h-12 px-4 lg:hidden transition-all duration-300 hover:scale-105"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Job Match Notification */}
        <Card className="mb-6 lg:mb-8 border-l-4 border-l-[#4A90A4] bg-blue-50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#4A90A4] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                <Bell className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">JOB MATCH FOUND</h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  We're showing you {jobs.length} job listings that are currently available and verified to help you take the next
                  step in your career.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-6 lg:gap-8 relative">
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setShowFilters(false)}>
              <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
                <FilterSection />
              </div>
            </div>
          )}

          {/* Desktop Left Sidebar - Filters */}
          <div className="hidden lg:block lg:w-80 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
            <div className="sticky top-24">
              <FilterSection />
            </div>
          </div>

          {/* Main Content - Job Listings */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="space-y-4 lg:space-y-6">
              {jobs.map((job, index) => (
                <Link 
                  key={index}
                  href={`/jobs/${index + 1}`}
                  className="block"
                >
                  <Card
                    className={`hover:shadow-2xl transition-all duration-500 border-l-4 ${getMatchScoreBorderColor(job.matchScore)} 
                      animate-in fade-in slide-in-from-bottom-4 group cursor-pointer
                      hover:scale-[1.02] lg:hover:scale-[1.03] hover:-translate-y-2 transform
                      hover:border-[#4A90A4] hover:shadow-[#4A90A4]/10 
                      relative overflow-hidden`}
                    style={{
                      animationDelay: `${400 + index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A90A4]/5 via-transparent to-[#FF8A50]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <CardContent className="p-4 lg:p-6 relative z-10">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Match Score Badge */}
                        <div className="flex flex-col items-center self-center sm:self-start z-10">
                          <div
                            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center ${getMatchScoreColor(
                              job.matchScore,
                            )} shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl ${getMatchScoreGlow(job.matchScore)} group-hover:animate-pulse relative z-10`}
                          >
                            <div className="text-center">
                              <div className="text-white font-bold text-sm lg:text-base">{job.matchScore}%</div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 transition-colors duration-300 group-hover:text-[#4A90A4] font-medium">Match</p>
                        </div>

                        {/* Job Content */}
                        <div className="flex-1 w-full sm:w-auto relative z-10">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-2 lg:space-y-0">
                            <div className="flex-1">
                              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#4A90A4] group-hover:translate-x-1 transform">
                                {job.title}
                              </h3>
                              <p className="text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-700 font-medium">
                                {job.company}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-500">
                                <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                  <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                  <span className="truncate">{job.location}</span>
                                </div>
                                <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                  <Clock className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                  <span>{job.type}</span>
                                </div>
                                <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                  <DollarSign className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                  <span className="truncate font-medium">{job.salary}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-left lg:text-right">
                              <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                                {job.posted}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="transition-all duration-300 group-hover:bg-[#4A90A4] group-hover:text-white group-hover:scale-105 text-xs">
                              React
                            </Badge>
                            <Badge variant="outline" className="transition-all duration-300 group-hover:bg-[#4A90A4] group-hover:text-white group-hover:scale-105 text-xs">
                              TypeScript
                            </Badge>
                            <Badge variant="outline" className="transition-all duration-300 group-hover:bg-[#4A90A4] group-hover:text-white group-hover:scale-105 text-xs">
                              Next.js
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    {/* Bottom border animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" disabled className="transition-all duration-300 text-sm px-3 py-2">
                  Previous
                </Button>
                <Button className="bg-[#4A90A4] text-white transition-all duration-300 hover:scale-105 text-sm px-3 py-2">
                  1
                </Button>
                <Button variant="outline" className="transition-all duration-300 hover:scale-105 text-sm px-3 py-2">
                  2
                </Button>
                <Button variant="outline" className="transition-all duration-300 hover:scale-105 text-sm px-3 py-2">
                  3
                </Button>
                <Button variant="outline" className="transition-all duration-300 hover:scale-105 text-sm px-3 py-2">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}