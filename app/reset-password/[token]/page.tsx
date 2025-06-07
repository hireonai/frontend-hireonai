"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordApi } from "@/lib/api/auth";

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const error = result.error.errors[0];
      toast({
        title: "Error",
        description: error.message,
        variant: "error",
      });
      return;
    }
    setLoading(true);
    const res = await resetPasswordApi(token as string, form.newPassword);
    setLoading(false);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });
      setTimeout(() => router.push("/login"), 2000);
    } else {
      toast({
        title: "Error",
        description: res.message || "Failed to send email reset password.",
        variant: "error",
      });
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-[#163756] via-[#202838] via-[#3E98A1] to-[#163756] text-white flex-col justify-center items-center text-white p-12 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-teal-600/20 animate-pulse"></div>

          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-float animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/35 rounded-full animate-float animation-delay-6000"></div>
          <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-green-300/30 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-purple-300/40 rounded-full animate-float animation-delay-3000"></div>
          <div className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-teal-300/25 rounded-full animate-float animation-delay-5000"></div>

          {/* Geometric Shapes */}
          <div className="absolute top-20 left-20 w-6 h-6 border border-white/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 right-32 w-4 h-4 border border-purple-300/30 animate-spin-reverse"></div>
          <div className="absolute top-1/2 left-12 w-5 h-5 border border-teal-300/25 rotate-45 animate-pulse"></div>

          {/* Light Beams */}
          <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-white/20 to-transparent rotate-12 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-purple-300/30 to-transparent -rotate-12 animate-pulse animation-delay-2000"></div>

          {/* Gradient Orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-32 h-32 bg-green-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 transform -translate-x-1/2"></div>
        </div>

        <div className="max-w-md text-center relative z-10 transform transition-all duration-1000 hover:scale-105">
          <div className="flex items-center justify-center space-x-2 mb-8 group">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-2xl relative overflow-hidden">
              <img
                src="/hireon-logo.png"
                alt="HireOn.AI Logo"
                className="w-8 h-8 transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-in slide-in-from-left-4 duration-1000 transition-all hover:scale-105">
              HireOn.AI
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 hover:text-purple-100 transition-colors duration-500">
            Join HireOn.AI
          </h1>

          <p className="text-xl text-teal-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 hover:text-white transition-colors duration-500 leading-relaxed">
            Start your journey to finding the perfect job with our AI-powered
            platform.
          </p>
        </div>
      </div>
      {/* Right Form Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Reset Password
            </CardTitle>
            <p className="text-gray-600">Enter your new password to reset</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Create a new password"
                  className="h-12"
                  value={form.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  className="h-12"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <Button
                className="w-full h-12 bg-[#163756] hover:bg-white hover:text-[#163756] text-white"
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
