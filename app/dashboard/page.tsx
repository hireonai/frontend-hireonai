"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Upload,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  User,
  Bell,
  Filter,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import { useReferenciesStore } from "@/store/referencies";
import { useToast } from "@/hooks/use-toast";
import { useJobsStore } from "@/store/jobs";
import { Pagination } from "@/components/ui/pagination";
import { JobsPagination } from "@/components/jobs-pagination";
import { ActiveFilters } from "@/components/active-filters";
import { JobListSkeleton } from "@/components/job-list-skeleton";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(() =>
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [salaryRange, setSalaryRange] = useState(() => [
    parseInt(searchParams.get("maxSalary") || "0", 10),
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categories = searchParams.get("categories");
    return categories ? categories.split(",") : [];
  });
  const [selectedExperience, setSelectedExperience] = useState<
    string | undefined
  >(() => searchParams.get("experience") || undefined);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(
    () => searchParams.get("industry") || undefined
  );
  const [showFilters, setShowFilters] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(
    () => searchParams.get("keyword") || ""
  );
  const [submittedKeyword, setSubmittedKeyword] = useState(
    () => searchParams.get("keyword") || ""
  );

  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  const [isPending, startTransition] = useTransition();

  const updateUrlParams = (
    params: Record<string, string | string[] | number | undefined>
  ) => {
    const url = new URL(window.location.href);

    url.searchParams.delete("page");
    url.searchParams.delete("keyword");
    url.searchParams.delete("categories");
    url.searchParams.delete("experience");
    url.searchParams.delete("industry");
    url.searchParams.delete("maxSalary");

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== 0) {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            url.searchParams.set(key, value.join(","));
          }
        } else {
          url.searchParams.set(key, value.toString());
        }
      }
    });

    startTransition(() => {
      router.replace(url.pathname + url.search, { scroll: false });
    });
  };

  useEffect(() => {
    setSearchKeyword(debouncedSearchKeyword);
  }, [debouncedSearchKeyword]);

  const getMatchScoreColor = (score: string | null) => {
    if (score === null) return "bg-gray-500";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "bg-green-500";
    if (scoreValue >= 60) return "bg-blue-500";
    if (scoreValue >= 45) return "bg-orange-500";
    return "bg-red-500";
  };

  const getMatchScoreBorderColor = (score: string | null) => {
    if (score === null) return "border-l-gray-500";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "border-l-green-500";
    if (scoreValue >= 60) return "border-l-blue-500";
    if (scoreValue >= 45) return "border-l-orange-500";
    return "border-l-red-500";
  };

  const getMatchScoreGlow = (score: string | null) => {
    if (score === null) return "";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "shadow-green-500/30";
    if (scoreValue >= 60) return "shadow-blue-500/30";
    if (scoreValue >= 45) return "shadow-orange-500/30";
    return "shadow-red-500/30";
  };

  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const { toast } = useToast();

  const jobCategories = useReferenciesStore((state) => state.jobCategories);
  const fetchJobCategories = useReferenciesStore(
    (state) => state.fetchJobCategories
  );

  const jobMinExperiences = useReferenciesStore(
    (state) => state.jobMinExperiences
  );
  const fetchJobMinExperiences = useReferenciesStore(
    (state) => state.fetchJobMinExperiences
  );

  const companyIndustries = useReferenciesStore(
    (state) => state.companyIndustries
  );
  const fetchCompanyIndustries = useReferenciesStore(
    (state) => state.fetchCompanyIndustries
  );

  const jobs = useJobsStore((state) => state.jobs);
  const fetchJobsList = useJobsStore((state) => state.fetchJobsList);
  const pagination = useJobsStore((state) => state.pagination);
  const loading = useJobsStore((state) => state.loading);

  useEffect(() => {
    fetchJobsList({
      page: currentPage,
      category: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      minSalary: 0,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
      keyword: submittedKeyword || undefined,
    });
  }, [
    currentPage,
    selectedCategories,
    selectedExperience,
    selectedIndustry,
    salaryRange,
    submittedKeyword,
    fetchJobsList,
  ]);

  useEffect(() => {
    fetchProfile();
    fetchJobCategories();
    fetchJobMinExperiences();
    fetchCompanyIndustries();
  }, [
    fetchProfile,
    fetchJobCategories,
    fetchJobMinExperiences,
    fetchCompanyIndustries,
  ]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [
    selectedCategories,
    selectedExperience,
    selectedIndustry,
    salaryRange,
    submittedKeyword,
  ]);

  const handleFilterChange = (page: number) => {
    setCurrentPage(page);

    updateUrlParams({
      page,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleSearch = () => {
    setSubmittedKeyword(searchKeyword);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: searchKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    let newCategories;
    if (checked) {
      newCategories = [...selectedCategories, categoryId];
    } else {
      newCategories = selectedCategories.filter((c) => c !== categoryId);
    }

    setSelectedCategories(newCategories);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: newCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleExperienceChange = (value: string) => {
    setSelectedExperience(value);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: value,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: value,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleSalaryRangeChange = (value: number[]) => {
    setSalaryRange(value);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: value[0] !== 0 ? value[0] : undefined,
    });
  };

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
            <p className="text-xs lg:text-sm text-gray-600 mb-2">
              Drag & drop your CV here
            </p>
            <Button
              variant="outline"
              size="sm"
              className="bg-[#163B56] text-white hover:bg-white hover:text-[#163B56] transition-all duration-300 hover:scale-105 text-xs lg:text-sm"
            >
              Browse Files
            </Button>
          </div>
        </div>

        {/* Salary Range */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">
            Salary Range
          </h3>
          <div className="space-y-4">
            <Slider
              value={salaryRange}
              onValueChange={handleSalaryRangeChange}
              max={70000000}
              step={500000}
              className="w-full"
            />
            <div className="flex justify-between text-xs lg:text-sm text-gray-600">
              <span>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(0)}
              </span>
              <span className="font-medium text-[#4A90A4]">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(salaryRange[0])}
              </span>
              <span>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(70000000)}
              </span>
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">
            Experience Level
          </h3>
          <Select
            value={selectedExperience}
            onValueChange={handleExperienceChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {jobMinExperiences?.map((exp) => (
                <SelectItem key={exp._id} value={exp._id}>
                  {exp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">
            Job Categories
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {jobCategories?.map((category) => (
              <div
                key={category._id}
                className="flex items-center space-x-2 group"
              >
                <Checkbox
                  id={category._id}
                  checked={selectedCategories.includes(category._id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category._id, checked as boolean)
                  }
                />
                <label
                  htmlFor={category._id}
                  className="text-xs lg:text-sm text-gray-700 cursor-pointer"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Company Industry */}
        <div>
          <h3 className="font-semibold mb-4 text-sm lg:text-base">
            Company Industry
          </h3>
          <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {companyIndustries?.map((industry) => (
                <SelectItem key={industry._id} value={industry._id}>
                  {industry.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  const handleLogout = () => {
    useAuthStore.getState().logout();
    useProfileStore.getState().clearProfile();
    toast({
      title: "Success",
      description: "Logout successfully.",
      variant: "success",
    });
    router.push("/");
  };

  const handleResetAllFilters = () => {
    setSearchKeyword("");
    setSubmittedKeyword("");
    setSalaryRange([0]);
    setSelectedExperience(undefined);
    setSelectedIndustry(undefined);
    setSelectedCategories([]);
    setCurrentPage(1);

    router.replace(window.location.pathname, { scroll: false });
  };

  const handleRemoveKeyword = () => {
    setSearchKeyword("");
    setSubmittedKeyword("");
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: undefined,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleRemoveSalary = () => {
    setSalaryRange([0]);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: undefined,
    });
  };

  const handleRemoveExperience = () => {
    setSelectedExperience(undefined);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: undefined,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleRemoveIndustry = () => {
    setSelectedIndustry(undefined);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: selectedCategories,
      experience: selectedExperience,
      industry: undefined,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  const handleRemoveCategory = (categoryId: string) => {
    const newCategories = selectedCategories.filter((c) => c !== categoryId);
    setSelectedCategories(newCategories);
    setCurrentPage(1);

    updateUrlParams({
      page: 1,
      keyword: submittedKeyword,
      categories: newCategories,
      experience: selectedExperience,
      industry: selectedIndustry,
      maxSalary: salaryRange[0] !== 0 ? salaryRange[0] : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-50 backdrop-blur-sm bg-white/95 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/hireon-logo.png"
                alt="hireon-logo"
                className="h-8 w-auto align-middle transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 via-[#4A90A4] to-gray-900 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105">
                HireOn.AI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-grow flex justify-center">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/dashboard"
                className="text-[#4A90A4] font-medium relative group"
              >
                Job list
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/cv-analysis"
                className="text-gray-700 hover:text-[#4A90A4] transition-colors duration-300 relative group"
              >
                CV Analysis
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4A90A4] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          {/* Profile Dropdown */}
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
                  <Link href="/" className="w-full">
                    Home
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
            <div className="flex items-center space-x-4">
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
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Job Match Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover personalized job opportunities with our AI-powered scoring
            system
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-300 group-focus-within:text-[#4A90A4]" />
              <Input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search for jobs, companies, or skills..."
                className="pl-10 h-12 transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20 focus:border-[#4A90A4]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="h-12 px-6 lg:px-8 bg-[#FF8A50] hover:bg-[#FF8A50]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1 sm:flex-initial"
              >
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

        <ActiveFilters
          submittedKeyword={submittedKeyword}
          onRemoveKeyword={handleRemoveKeyword}
          salaryRange={salaryRange}
          onRemoveSalary={handleRemoveSalary}
          selectedExperience={selectedExperience}
          onRemoveExperience={handleRemoveExperience}
          jobMinExperiences={jobMinExperiences}
          selectedIndustry={selectedIndustry}
          onRemoveIndustry={handleRemoveIndustry}
          companyIndustries={companyIndustries}
          selectedCategories={selectedCategories}
          onRemoveCategory={handleRemoveCategory}
          jobCategories={jobCategories}
          onResetAll={handleResetAllFilters}
        />

        {/* Job Match Notification */}
        {!loading && (
          <>
            {jobs.length === 0 ? (
              <Card className="mb-6 lg:mb-8 border-l-4 border-l-red-500 bg-red-50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 lg:w-12 h-10 lg:h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                      <Bell className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-red-900 mb-2">
                        NO JOB MATCH FOUND
                      </h3>
                      <p className="text-red-600 text-sm lg:text-base">
                        We're sorry, but we couldn't find any job listings that
                        match your search criteria. Please try adjusting your
                        search filters or searching for a different job title.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6 lg:mb-8 border-l-4 border-l-[#4A90A4] bg-blue-50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 lg:w-12 h-10 lg:h-12 bg-[#4A90A4] rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                      <Bell className="w-5 lg:w-6 h-5 lg:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        JOB MATCH FOUND
                      </h3>
                      <p className="text-gray-600 text-sm lg:text-base">
                        We're showing you {pagination?.totalItems} job listings
                        that are currently available and verified to help you
                        take the next step in your career.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <div className="flex gap-6 lg:gap-8 relative">
          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
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
              {loading ? (
                <JobListSkeleton count={5} />
              ) : jobs.length === 0 ? null : (
                jobs.map((job, index) => (
                  <Link
                    key={index}
                    href={`/jobs/${job._id || index + 1}`}
                    className="block"
                  >
                    <Card
                      className={`hover:shadow-2xl transition-all duration-500 border-l-4 ${getMatchScoreBorderColor(
                        job.scoreMatch
                      )} 
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
                                job.scoreMatch
                              )} shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:shadow-2xl ${getMatchScoreGlow(
                                job.scoreMatch
                              )} group-hover:animate-pulse relative z-10`}
                            >
                              <div className="text-center">
                                <div className="text-white font-bold text-sm lg:text-base">
                                  {job.scoreMatch ? job.scoreMatch : "-"}
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 transition-colors duration-300 group-hover:text-[#4A90A4] font-medium">
                              Match
                            </p>
                          </div>

                          {/* Job Content */}
                          <div className="flex-1 w-full sm:w-auto relative z-10">
                            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 space-y-2 lg:space-y-0">
                              <div className="flex-1">
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#4A90A4] group-hover:translate-x-1 transform">
                                  {job.jobPosition}
                                </h3>
                                <p className="text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-700 font-medium">
                                  {job.company?.name}
                                </p>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                    <MapPin className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                    <span className="truncate">
                                      {job.workingLocation}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                    <Clock className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                    <span>{job.workingLocationType}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 transition-all duration-300 group-hover:text-gray-700 group-hover:scale-105">
                                    <DollarSign className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                                    <span className="truncate font-medium">
                                      {Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      }).format(job.minSalary)}{" "}
                                      -{" "}
                                      {Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                      }).format(job.maxSalary)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-left lg:text-right">
                                <p className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                                  {new Intl.RelativeTimeFormat("en", {
                                    numeric: "auto",
                                  }).format(
                                    -Math.ceil(
                                      (Date.now() -
                                        new Date(job.updatedAt).getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    ),
                                    "day"
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {job.categories?.map((category, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="transition-all duration-300 group-hover:bg-[#4A90A4] group-hover:text-white group-hover:scale-105 text-xs"
                                >
                                  {category.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      {/* Bottom border animation */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </Card>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
              <div className="flex flex-row flex-wrap justify-center w-full gap-2">
                {pagination && jobs.length > 0 && (
                  <JobsPagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => handleFilterChange(page)}
                    hasPrevPage={pagination.hasPrevPage}
                    hasNextPage={pagination.hasNextPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
