import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, FileText, Euro, Users, Github, Youtube, Linkedin } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-4 py-4 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/hireon-logo.png" alt="hireon Logo" className="h-8 w-auto align-middle" />
            <span className="text-xl font-bold text-gray-900">HireOn.AI</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#4A90A4]">
              Home
            </Link>
            <Link href="#features" className="text-gray-700 hover:text-[#4A90A4]">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-[#4A90A4]">
              How it Works
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-[#4A90A4] text-[#4A90A4] hover:bg-[#4A90A4] hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" className="border-[#4A90A4] text-white bg-[#4A90A4] hover:bg-white hover:text-[#4A90A4]">Register</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#163756] via-[#202838] via-[#3E98A1] to-[#163756] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Personal Assistant for Job Hunting</h1>
            <p className="text-xl mb-8 text-teal-100">
              Get AI-powered CV analysis, personalized job recommendations, and comprehensive career tracking tools to
              accelerate your job search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-[#4A90A4] text-white hover:bg-white hover:text-[#4A90A4]"
                >
                  Get Started
                </Button>
              </Link>
              <Button size="lg" className="bg-white text-[#4A90A4] hover:bg-[#163756] hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <img src="/hero-removebg.png" alt="Hero Image" className="w-full max-w-xl h-auto" />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed in your job search</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#4A90A4] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">CV Analysis</h3>
                <p className="text-gray-600">
                  Get detailed feedback on your CV with AI-powered analysis and improvement suggestions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Cover Letter Generator</h3>
                <p className="text-gray-600">
                  Generate personalized cover letters for each job application in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#4A90A4] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Euro className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Salary Prediction</h3>
                <p className="text-gray-600">Get accurate salary predictions based on your skills and market data.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Interview Preparation</h3>
                <p className="text-gray-600">Practice with AI-powered mock interviews and get personalized feedback.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#4A90A4] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Job Matching</h3>
                <p className="text-gray-600">Find the perfect job matches with our AI-powered recommendation system.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FF8A50] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Career Tracking</h3>
                <p className="text-gray-600">Track your applications and career progress with detailed analytics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4A90A4] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload CV</h3>
              <p className="text-gray-600">Upload your current CV to get started with our AI analysis.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF8A50] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Analysis</h3>
              <p className="text-gray-600">Receive detailed feedback and improvement suggestions for your CV.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4A90A4] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Jobs</h3>
              <p className="text-gray-600">Discover personalized job matches and apply with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold mb-2">Sarah Johnson</h4>
                <p className="text-gray-600 text-sm mb-4">Software Engineer</p>
                <p className="text-gray-700">
                  {'"HireOn.AI helped me land my dream job with their amazing CV analysis and job matching features."'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold mb-2">Jennifer Lisa Vandall</h4>
                <p className="text-gray-600 text-sm mb-4">Marketing Manager</p>
                <p className="text-gray-700">
                  {'"The cover letter generator saved me hours of work and helped me get more interview calls."'}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <h4 className="font-semibold mb-2">Riha Erfina</h4>
                <p className="text-gray-600 text-sm mb-4">Data Scientist</p>
                <p className="text-gray-700">
                  {'"The AI-powered job recommendations are incredibly accurate. Found my perfect match!"'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E50] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img src="/hireon-logo.png" alt="HireOn.AI Logo" className="w-8 h-8" />
                </div>
                <span className="text-xl font-bold">HireOn.AI</span>
              </div>
              <p className="text-gray-300">Your personal assistant for job hunting with AI-powered tools.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
                <Youtube className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2025 HireOn.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
