"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, MapPin, FileText, Calendar, ChevronDown, Lock } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

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
              <Link href="/cv-analysis" className="text-gray-700 hover:text-[#4A90A4]">
                CV-Analysis
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-[#4A90A4]">
                Job-list
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
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
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Erika Erfina</h1>
                <p className="text-xl text-gray-600 mb-2">Senior Machine Learning Engineer</p>
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Cilayem, Depok</span>
                </div>
                <Button className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Erika Erfina" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Cilayem, Depok" disabled={!isEditing} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="erika.erfina@email.com" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+62 812-3456-7890" disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Last Education</Label>
                  <Select disabled={!isEditing}>
                    <SelectTrigger>
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
                  <Input id="preferredLocation" defaultValue="Jakarta, Indonesia" disabled={!isEditing} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobCategories">Job Categories of Interest</Label>
                  <Textarea
                    id="jobCategories"
                    defaultValue="Machine Learning, Data Science, AI Research, Software Engineering"
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* My CV */}
            <Card>
              <CardHeader>
                <CardTitle>My CV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-[#4A90A4]" />
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
                  <Button variant="outline" className="w-full">
                    Replace
                  </Button>
                  <Button variant="outline" className="w-full">
                    Upload New CV
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Saved Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Senior Frontend Developer</h4>
                  <p className="text-sm text-gray-600 mb-2">TechCorp Solutions</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">90% Match</Badge>
                    <Button size="sm" className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">
                      Apply Now
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">ML Engineer</h4>
                  <p className="text-sm text-gray-600 mb-2">DataTech Inc</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">95% Match</Badge>
                    <Button size="sm" className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">
                      Apply Now
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Data Scientist</h4>
                  <p className="text-sm text-gray-600 mb-2">AI Solutions Ltd</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">88% Match</Badge>
                    <Button size="sm" className="bg-[#4A90A4] hover:bg-[#4A90A4]/90">
                      Apply Now
                    </Button>
                  </div>
                </div>

                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
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
