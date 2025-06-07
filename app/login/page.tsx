"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username or email is required." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function LoginForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const login = useAuthStore((state) => state.login);
  const setToken = useAuthStore((s) => s.setToken);
  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
    if (profile) {
      router.replace("/dashboard");
    }

    const token = searchParams.get("token");
    const success = searchParams.get("success");
    const error = searchParams.get("error");

    if (token) {
      setAlert(null);
      setToken(token);
      toast({
        title: "Success",
        description: "Login successfully.",
        variant: "success",
      });
      router.replace("/dashboard");
    } else if (success) {
      setAlert({
        type: "success",
        message: decodeURIComponent(success),
      });
      router.replace("/login");
    } else if (error) {
      setAlert({
        type: "error",
        message: decodeURIComponent(error),
      });
      router.replace("/login");
    }
  }, [searchParams, setToken, profile, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parse = loginSchema.safeParse(form);
    if (!parse.success) {
      toast({
        title: "Error",
        description: parse.error.errors.map((err) => err.message).join(", "),
        variant: "error",
      });
      return;
    }
    setLoading(true);
    const result = await login(form.username, form.password);
    setLoading(false);
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        variant: "success",
      });
      fetchProfile();
      router.push("/dashboard");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "error",
      });
    }
  };
  return (
    <Card className="w-full max-w-md border-0 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Sign In
        </CardTitle>
        <p className="text-gray-600">
          Enter your credentials to access your account
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {alert && (
          <div
            className={`rounded-md px-4 py-3 text-sm ${
              alert.type === "error"
                ? "bg-red-100 text-red-800 border border-red-300"
                : "bg-green-100 text-green-800 border border-green-300"
            }`}
          >
            {alert.message}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-2">
            <Label htmlFor="username">Email</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username or email"
              className="h-12"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="h-12"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-between">
            <Link
              href="/activate"
              className="text-sm text-[#4A90A4] hover:underline"
            >
              Send Email Activation
            </Link>
            <Link
              href="/forgot-password"
              className="text-sm text-[#4A90A4] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            className="w-full h-12 bg-[#163756] hover:bg-white hover:text-[#163756] text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            Or continue with
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-12"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/linkedin`;
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#0077B5"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#1877F2"
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="text-[#4A90A4] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
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
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
