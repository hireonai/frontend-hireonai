import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#4A90A4] flex-col justify-center items-center text-white p-12">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#4A90A4] font-bold text-xl">H</span>
            </div>
            <span className="text-3xl font-bold">HireOn.AI</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Reset Your Password</h1>
          <p className="text-xl text-teal-100">{"Don't worry, we'll send you reset instructions to your email."}</p>
        </div>
      </div>

      {/* Right Form Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password</CardTitle>
            <p className="text-gray-600">Enter your email to receive reset instructions</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email address" className="h-12" />
              </div>

              <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white">Send Reset Email</Button>
            </form>

            <div className="text-center">
              <Link href="/login" className="inline-flex items-center text-sm text-[#4A90A4] hover:underline">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
