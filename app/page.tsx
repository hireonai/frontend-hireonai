"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  FileText,
  Euro,
  Linkedin,
  Sparkles,
  Star,
  Zap,
  Briefcase,
  Newspaper,
  UserRound,
  Instagram,
  Twitter,
  User,
  ChevronDown,
  LogIn,
  Menu,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target instanceof HTMLAnchorElement &&
        target.hash &&
        document.querySelector(target.hash)
      ) {
        e.preventDefault();
        const section = document.querySelector(target.hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        history.pushState(null, "", target.hash);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}

export default function LandingPage() {
  useSmoothScroll();

  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    useProfileStore.getState().clearProfile();
    toast({
      title: "Success",
      description: "Logout successfully.",
      variant: "success",
    });
  };

  return (
    <div id="home" className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-200/50 px-4 py-4 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/90 transition-all duration-500 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="#home" className="flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src="/hireon-logo.png"
                  alt="hireon Logo"
                  className="h-8 w-auto align-middle transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 drop-shadow-lg"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-[#4A90A4]/20 to-[#FF8A50]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                HireOn.AI
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#4A90A4] transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transition-all duration-500 group-hover:w-full rounded-full"></span>
              <span className="absolute -inset-2 bg-[#4A90A4]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
            >
              Job list
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transition-all duration-500 group-hover:w-full rounded-full"></span>
              <span className="absolute -inset-2 bg-[#4A90A4]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
            </Link>
            <Link
              href="/cv-analysis"
              className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
            >
              CV Analysis
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transition-all duration-500 group-hover:w-full rounded-full"></span>
              <span className="absolute -inset-2 bg-[#4A90A4]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    {profile?.photoUrl ? (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        <img
                          src={profile.photoUrl}
                          alt="profile-photo"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="animate-in slide-in-from-top-2 duration-300"
                >
                  <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                    <Link href="/dashboard" className="w-full">
                      Job List
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                    <Link href="/cv-analysis" className="w-full">
                      CV Analysis
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="transition-colors duration-200 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-2 border-[#4A90A4] text-[#4A90A4] hover:bg-[#4A90A4] hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-[#4A90A4]/25 backdrop-blur-sm font-semibold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] text-white hover:from-[#FF8A50] hover:to-[#4A90A4] transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-[#4A90A4]/30 font-semibold relative overflow-hidden group">
                      <span className="relative z-10">Register</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </Button>
                  </Link>
                </div>
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300"
                        aria-label="Open login/register menu"
                      >
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                          <Menu className="w-4 h-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="animate-in slide-in-from-top-2 duration-300"
                    >
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                        <Link href="/login" className="w-full">
                          Login
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100">
                        <Link href="/register" className="w-full">
                          Register
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                        <Link href="/dashboard" className="w-full">
                          Job List
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                        <Link href="/cv-analysis" className="w-full">
                          CV Analysis
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#163756] via-[#202838] via-[#3E98A1] to-[#163756] text-white py-16 md:py-20 overflow-hidden mt-20 scroll-mt-24">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-teal-600/30 animate-pulse"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#4A90A4]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#FF8A50]/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 right-20 w-48 h-48 bg-yellow-400/15 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-1000"></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-green-400/15 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-3000"></div>
          {/* Additional Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#4A90A4]/10 to-transparent animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF8A50]/10 to-transparent animate-pulse animation-delay-2000"></div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-float animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/35 rounded-full animate-float animation-delay-6000"></div>
          <div className="absolute top-3/4 left-1/2 w-2 h-2 bg-yellow-300/30 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute top-1/6 right-1/2 w-1 h-1 bg-[#FF8A50]/40 rounded-full animate-float animation-delay-3000"></div>
          <div className="absolute bottom-1/3 right-1/6 w-2.5 h-2.5 bg-[#4A90A4]/25 rounded-full animate-float animation-delay-5000"></div>
          {/* Additional Geometric Shapes */}
          <div
            className="absolute top-20 left-20 w-6 h-6 border border-white/20 rotate-45 animate-spin"
            style={{ animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-32 right-32 w-4 h-4 border border-[#FF8A50]/30 animate-spin"
            style={{ animationDuration: "6s", animationDirection: "reverse" }}
          ></div>
          <div className="absolute top-1/2 left-12 w-5 h-5 border border-[#4A90A4]/25 rotate-45 animate-pulse"></div>
          {/* Floating Text Elements */}
          <div className="absolute top-16 right-1/3 text-white/10 text-xs animate-float animation-delay-2000 rotate-12">
            AI
          </div>
          <div className="absolute bottom-20 left-1/4 text-white/10 text-xs animate-float animation-delay-4000 -rotate-12">
            SMART
          </div>
          <div className="absolute top-1/3 left-1/6 text-white/10 text-xs animate-float animation-delay-3000 rotate-45">
            CV
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
          {/* Left: Text & Buttons */}
          <div className="space-y-8 order-1 md:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium text-white/90">
                  AI-Powered Job Hunting Assistant
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                <span className="block">Your Personal</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-blue-200 to-purple-200 flip-text">
                  Assistant
                </span>
                <span className="block">
                  for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 inline-block">
                    Job Hunting
                  </span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-teal-100/90 leading-relaxed max-w-2xl">
                Discover thousands of job listings in one place, optimize your
                CV with AI, and receive smart personalized job recommendations
                to
                <span className="font-semibold text-yellow-200">
                  {" "}
                  boost your job search success.
                </span>
              </p>
            </div>
            {/* Buttons in a row, always with gap */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="sm:w-full">
                <Link href="/dashboard" passHref legacyBehavior>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] text-white hover:from-[#FF8A50] hover:to-[#4A90A4] transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-[#4A90A4]/40 text-lg px-8 py-4 relative overflow-hidden font-semibold w-full"
                  >
                    <a>
                      <span className="relative z-10 flex items-center space-x-2">
                        <Zap className="w-5 h-5 group-hover:animate-pulse" />
                        <span>Get Started</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </a>
                  </Button>
                </Link>
              </div>
              <div className="sm:w-full mt-4 sm:mt-0">
                <Link href="#how-it-works" passHref legacyBehavior>
                  <Button
                    asChild
                    size="lg"
                    className="group bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white hover:text-[#4A90A4] transition-all duration-700 hover:scale-110 hover:shadow-2xl text-lg px-8 py-4 font-semibold w-full"
                  >
                    <a>
                      <span className="flex items-center space-x-2">
                        <Star className="w-5 h-5 group-hover:animate-spin group-hover:text-yellow-500 transition-colors duration-500" />
                        <span>Learn More</span>
                      </span>
                    </a>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="hidden md:flex justify-center md:justify-end mb-8 md:mb-0 order-2 md:order-2 md:pl-8">
            <div className="relative group max-w-xs sm:max-w-md md:max-w-xl w-full">
              <img
                src="/hero-removebg.png"
                alt="Hero Image"
                className="w-full h-auto transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2 drop-shadow-2xl relative z-10"
              />
              {/* Main Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#4A90A4]/30 to-[#FF8A50]/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
              {/* Floating Icons Around Hero */}
              <div
                className="absolute -top-8 -left-8 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float animation-delay-1000 group-hover:scale-125 transition-all duration-500"
                style={{ zIndex: -1 }}
              >
                <FileText className="w-8 h-8 text-white/80" />
              </div>
              <div className="absolute top-12 -right-12 w-12 h-12 bg-[#FF8A50]/20 backdrop-blur-md rounded-xl flex items-center justify-center animate-float animation-delay-3000 group-hover:scale-125 transition-all duration-500">
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="absolute -bottom-4 -left-12 w-14 h-14 bg-[#4A90A4]/20 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float animation-delay-2000 group-hover:scale-125 transition-all duration-500">
                <CheckCircle className="w-7 h-7 text-green-300" />
              </div>
              <div className="absolute bottom-16 -right-8 w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center animate-float animation-delay-4000 group-hover:scale-125 transition-all duration-500">
                <Zap className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="absolute top-1/3 -left-16 w-8 h-8 bg-purple-400/20 backdrop-blur-md rounded-lg flex items-center justify-center animate-float animation-delay-5000 group-hover:scale-125 transition-all duration-500">
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              {/* Orbiting Circles */}
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "20s" }}
              >
                <div className="absolute -top-12 left-1/2 w-4 h-4 bg-white/30 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{
                  animationDuration: "15s",
                  animationDirection: "reverse",
                }}
              >
                <div className="absolute top-1/2 -right-16 w-3 h-3 bg-[#FF8A50]/40 rounded-full transform -translate-y-1/2"></div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "25s" }}
              >
                <div className="absolute -bottom-8 left-1/3 w-2 h-2 bg-[#4A90A4]/50 rounded-full"></div>
              </div>
              {/* Additional Glow Rings */}
              <div
                className="absolute inset-0 rounded-full border border-white/10 animate-ping"
                style={{ animationDuration: "3s" }}
              ></div>
              <div
                className="absolute inset-8 rounded-full border border-[#4A90A4]/20 animate-ping animation-delay-1000"
                style={{ animationDuration: "3s" }}
              ></div>
              {/* Success Metrics Floating Cards */}
              <div
                className="absolute -top-16 right-16 bg-white/10 backdrop-blur-md rounded-lg p-3 animate-float animation-delay-1500 group-hover:scale-110 transition-all duration-500"
                style={{ zIndex: -1 }}
              >
                <div className="text-white text-sm font-semibold">
                  95% Success Rate
                </div>
                <div className="text-green-300 text-xs">↑ +23% this month</div>
              </div>
              <div className="absolute -bottom-12 left-12 bg-white/10 backdrop-blur-md rounded-lg p-3 animate-float animation-delay-2500 group-hover:scale-110 transition-all duration-500">
                <div className="text-white text-sm font-semibold">
                  AI Powered
                </div>
                <div className="text-[#FF8A50] text-xs flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  Smart Analysis
                </div>
              </div>
              {/* Background Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                    backgroundPosition: "0 0, 15px 15px",
                  }}
                ></div>
              </div>
              {/* Dynamic Light Beams */}
              <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-white/30 to-transparent rotate-12 animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-[#4A90A4]/40 to-transparent -rotate-12 animate-pulse animation-delay-2000"></div>
              {/* Floating Plus Icons */}
              <div className="absolute top-8 right-24 text-white/20 animate-float animation-delay-3000">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </div>
              <div className="absolute bottom-20 left-8 text-white/20 animate-float animation-delay-4000">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features Section */}
      <section
        id="features"
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#4A90A4]/10 to-[#FF8A50]/10 rounded-full px-6 py-3 mb-6">
              <Star className="w-5 h-5 text-[#4A90A4] animate-pulse" />
              <span className="text-sm font-semibold text-[#4A90A4]">
                POWERFUL FEATURES
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900">
                Key Features
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to succeed in your job search, powered by
              cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "One-Stop Job Aggregation",
                description:
                  "Access thousands of job listings from multiple portals in one place, no more switching sites.",
                color: "from-[#4A90A4] to-[#3E98A1]",
                delay: "delay-100",
              },
              {
                icon: FileText,
                title: "Smart CV Analysis & Optimization",
                description:
                  "Upload your CV for an instant relevance score, deep analysis, and tailored improvement tips.",
                color: "from-[#FF8A50] to-[#FF6B35]",
                delay: "delay-200",
              },
              {
                icon: Star,
                title: "Personalized Job Ranking",
                description:
                  "AI-driven recommendations matched to your profile, skills, and preferences.",
                color: "from-[#4A90A4] to-[#3E98A1]",
                delay: "delay-300",
              },
              {
                icon: Newspaper,
                title: "AI Cover Letter Assistant",
                description:
                  "Easily generate cover letters that highlight your strengths and fit the job requirements.",
                color: "from-[#FF8A50] to-[#FF6B35]",
                delay: "delay-400",
              },
              {
                icon: Euro,
                title: "Salary Range Prediction",
                description:
                  "Get AI-powered salary estimates based on market data, even for jobs without salary info.",
                color: "from-[#4A90A4] to-[#3E98A1]",
                delay: "delay-500",
              },
              {
                icon: CheckCircle,
                title: "Job Label & Category Prediction",
                description:
                  "Automatically predict the most relevant job labels and categories for every listing.",
                color: "from-[#FF8A50] to-[#FF6B35]",
                delay: "delay-600",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:-translate-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${feature.delay} group cursor-pointer bg-white/70 backdrop-blur-sm hover:bg-white`}
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl relative z-10`}
                  >
                    <feature.icon className="w-10 h-10 text-white transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  </div>

                  <h3 className="text-xl font-bold mb-4 transition-all duration-500 group-hover:text-[#4A90A4] relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 transition-all duration-500 group-hover:text-gray-700 leading-relaxed relative z-10">
                    {feature.description}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50/30 to-white"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900">
                How It Works
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Get started in three simple steps and transform your job search
              experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {[
              {
                number: "1",
                title: "Upload CV",
                description:
                  "Upload your current CV to get started with our AI analysis.",
                delay: "delay-200",
              },
              {
                number: "2",
                title: "Get Analysis",
                description:
                  "Receive detailed feedback and improvement suggestions for your CV.",
                delay: "delay-300",
              },
              {
                number: "3",
                title: "Find Jobs",
                description:
                  "Discover personalized job matches and apply with confidence.",
                delay: "delay-400",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ${step.delay} group`}
              >
                <div className="relative mb-8">
                  <div
                    className={`w-24 h-24 ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-[#4A90A4] to-[#3E98A1]"
                        : "bg-gradient-to-br from-[#FF8A50] to-[#FF6B35]"
                    } rounded-full flex items-center justify-center mx-auto transition-all duration-700 group-hover:scale-125 group-hover:shadow-2xl ${
                      index % 2 === 0
                        ? "group-hover:shadow-[#4A90A4]/40"
                        : "group-hover:shadow-[#FF8A50]/40"
                    } relative overflow-hidden`}
                  >
                    <span className="text-3xl font-bold text-white transition-transform duration-700 group-hover:scale-110 relative z-10">
                      {step.number}
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-current/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-ping"></div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 transition-all duration-500 group-hover:text-[#4A90A4] group-hover:scale-105">
                  {step.title}
                </h3>
                <p className="text-gray-600 transition-all duration-500 group-hover:text-gray-700 text-lg leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#4A90A4]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-[#FF8A50]/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900">
                What Our Users Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                quote:
                  "HireOn.AI helped me land my dream job with their amazing CV analysis and job matching features.",
                delay: "delay-200",
              },
              {
                name: "Jennifer Lisa Vandall",
                role: "Marketing Manager",
                quote:
                  "The cover letter generator saved me hours of work and helped me get more interview calls.",
                delay: "delay-300",
              },
              {
                name: "Riha Erfina",
                role: "Data Scientist",
                quote:
                  "The AI-powered job recommendations are incredibly accurate. Found my perfect match!",
                delay: "delay-400",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-110 hover:-translate-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${testimonial.delay} group cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white relative overflow-hidden`}
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A90A4]/5 via-transparent to-[#FF8A50]/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-6 transition-all duration-700 group-hover:scale-110 group-hover:shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4A90A4]/20 to-[#FF8A50]/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                      <UserRound className="w-10 h-10" />
                    </div>
                  </div>

                  <h4 className="font-bold text-lg mb-2 transition-all duration-500 group-hover:text-[#4A90A4] relative z-10">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-6 font-medium relative z-10">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-700 transition-all duration-500 group-hover:text-gray-900 text-lg leading-relaxed relative z-10 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-all duration-500">
                    <Star className="w-6 h-6 text-[#4A90A4] group-hover:animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A90A4] via-[#FF8A50] to-[#4A90A4]"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#4A90A4]/10 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#FF8A50]/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
              <div className="flex items-center space-x-3 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-xl">
                  <img
                    src="/hireon-logo.png"
                    alt="HireOn.AI Logo"
                    className="w-10 h-10"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                  HireOn.AI
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                Always on for your career. Find your dream job with us.
              </p>
            </div>

            {[
              {
                title: "Quick Links",
                links: [
                  { name: "Home", href: "#home" },
                  { name: "Features", href: "#features" },
                  { name: "How it Works", href: "#how-it-works" },
                ],
                delay: "delay-200",
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "/help" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ],
                delay: "delay-300",
              },
            ].map((section, index) => (
              <div
                key={index}
                className={`animate-in fade-in slide-in-from-bottom-8 duration-1000 ${section.delay}`}
              >
                <h4 className="font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-300 hover:text-[#4A90A4] text-lg hover:translate-x-2 inline-block relative group"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <h4 className="font-bold text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {[
                  {
                    Icon: Instagram,
                    color: "hover:text-[#C13584]",
                    hoverColor: "hover:bg-[#C13584]/20",
                  },
                  {
                    Icon: Twitter,
                    color: "hover:text-[#1DA1F2]",
                    hoverColor: "hover:bg-[#1DA1F2]/20",
                  },
                  {
                    Icon: Linkedin,
                    color: "hover:text-blue-500",
                    hoverColor: "hover:bg-blue-500/20",
                  },
                ].map(({ Icon, color, hoverColor }, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 hover:scale-125 hover:shadow-xl cursor-pointer group ${hoverColor}`}
                  >
                    <Icon
                      className={`w-6 h-6 text-gray-300 transition-all duration-300 ${color} group-hover:scale-110`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600/50 mt-12 pt-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <p className="text-gray-300 text-lg">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-semibold text-[#4A90A4]">HireOn.AI</span>.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1500 {
          animation-delay: 1.5s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-2500 {
          animation-delay: 2.5s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-5000 {
          animation-delay: 5s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            #4a90a4 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }
        .flip-text {
          animation: flip-in 1.5s ease-in-out;
          transform-style: preserve-3d;
        }

        @keyframes flip-in {
          0% {
            transform: rotateY(-90deg);
            opacity: 0;
          }
          50% {
            transform: rotateY(0deg);
            opacity: 0.5;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
