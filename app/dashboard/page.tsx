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
import { Search, Upload, MapPin, Clock, DollarSign, ChevronDown, User, Bell } from "lucide-react"

export default function DashboardPage() {
  const [salaryRange, setSalaryRange] = useState([0])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

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

  const jobs = Array(6).fill({
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Jakarta, Indonesia",
    type: "Full-time",
    salary: "$60,000 - $80,000",
    posted: "2 days ago",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/hireon-logo.png" alt="hireon-logo" className="h-8 w-auto align-middle" />
              <span className="text-xl font-bold text-gray-900">HireOn.AI</span>
            </Link>
          </div>

          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-[#4A90A4]">
                Home
              </Link>
              <Link href="/cv-analysis" className="text-gray-700 hover:text-[#4A90A4]">
                CV-Analysis
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-[#4A90A4] font-medium text-[#4A90A4]">
                Job-list
              </Link>
            </nav>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/cv-analysis">CV Analysis</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Match Dashboard</h1>
          <p className="text-gray-600">Discover personalized job opportunities with our AI-powered scoring system</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search for jobs, companies, or skills..." className="pl-10 h-12" />
            </div>
            <Button className="h-12 px-8 bg-[#FF8A50] hover:bg-[#FF8A50]/90">Search Jobs</Button>
          </div>
        </div>

        {/* Job Match Notification */}
        <Card className="mb-8 border-l-4 border-l-[#4A90A4] bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#4A90A4] rounded-full flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">JOB MATCH FOUND</h3>
                <p className="text-gray-600">
                  We're showing you 8 job listings that are currently available and verified to help you take the next
                  step in your career.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                {/* Upload CV Section */}
                <div>
                  <h3 className="font-semibold mb-4">Upload CV</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag & drop your CV here</p>
                    <Button variant="outline" size="sm" className="bg-[#163B56] text-white hover:bg-white hover:text-[#163B56]">
                      Browse Files
                    </Button>
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h3 className="font-semibold mb-4">Salary Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                      max={70000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>${salaryRange[0].toLocaleString()}</span>
                      <span>$70,000</span>
                    </div>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="font-semibold mb-4">Experience Level</h3>
                  <Select>
                    <SelectTrigger>
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
                  <h3 className="font-semibold mb-4">Job Categories</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {jobCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
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
                        />
                        <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Industry */}
                <div>
                  <h3 className="font-semibold mb-4">Company Industry</h3>
                  <Select>
                    <SelectTrigger>
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
          </div>

          {/* Main Content - Job Listings */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{job.posted}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Next.js</Badge>
                      </div>
                      <Link href={`/jobs/${index + 1}`}>
                        <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">Apply Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button className="bg-[#4A90A4] text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
