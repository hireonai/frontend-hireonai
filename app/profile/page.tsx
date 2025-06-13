"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  MapPin,
  FileText,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { TagInput } from "@/components/tag-input";
import ProfilePageSkeleton from "@/components/profile-skeleton";
export default function ProfilePage() {
  const getMatchScoreColor = (score: string | null | undefined) => {
    if (score === null || score === undefined) return "bg-gray-500";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "bg-green-500";
    if (scoreValue >= 60) return "bg-blue-500";
    if (scoreValue >= 45) return "bg-orange-500";
    return "bg-red-500";
  };

  const getMatchScoreBorderColor = (score: string | null | undefined) => {
    if (score === null || score === undefined) return "border-l-gray-500";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "border-l-green-500";
    if (scoreValue >= 60) return "border-l-blue-500";
    if (scoreValue >= 45) return "border-l-orange-500";
    return "border-l-red-500";
  };

  const getMatchScoreGlow = (score: string | null | undefined) => {
    if (score === null || score === undefined) return "";
    const scoreValue = parseFloat(score.replace("%", ""));
    if (scoreValue >= 85) return "shadow-green-500/30";
    if (scoreValue >= 60) return "shadow-blue-500/30";
    if (scoreValue >= 45) return "shadow-orange-500/30";
    return "shadow-red-500/30";
  };

  const [isEditing, setIsEditing] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const uploadPhoto = useProfileStore((state) => state.uploadPhoto);
  const updateTagPreferences = useProfileStore(
    (state) => state.updateTagPreferences
  );
  const uploadCV = useProfileStore((state) => state.uploadCV);

  const router = useRouter();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [initialTags, setInitialTags] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    domicile: "",
    lastEducation: "",
    portfolioUrl: "",
  });

  const cvInputRef = useRef<HTMLInputElement>(null);
  const [cvError, setCvError] = useState<string | null>(null);

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isUploadingCV, setIsUploadingCV] = useState(false);

  const deleteCV = useProfileStore((state) => (state as any).deleteCV); // Pastikan sudah update store
  const [isDeletingCV, setIsDeletingCV] = useState(false);

  const handleDeleteCV = async () => {
    setCvError(null);
    setIsDeletingCV(true);
    const res = await deleteCV();
    setIsDeletingCV(false);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });
    } else {
      setCvError(res.message);
      toast({
        title: "Error",
        description: res.message,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (profile === null) {
      fetchProfile().then((res) => {
        if (!res.success) {
          router.push("/login");
        }
      });
    }
  }, [profile, fetchProfile, router]);

  useEffect(() => {
    if (profile) {
      setTags(profile.tagPreferences || []);
      setInitialTags(profile.tagPreferences || []);
      setForm({
        fullname: profile.fullname ?? "",
        phone: profile.phone ?? "",
        domicile: profile.domicile ?? "",
        lastEducation: profile.lastEducation ?? "",
        portfolioUrl: profile.portfolioUrl ?? "",
      });
      setPreview(null);
    }
  }, [profile]);

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("File must be an image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be under 5MB.");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => inputRef.current?.click();

  const handleCvUploadClick = () => cvInputRef.current?.click();
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setCvError("File must be a PDF.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setCvError("PDF size must be under 5MB.");
        return;
      }
      setIsUploadingCV(true);
      uploadCV(file).then((res) => {
        setIsUploadingCV(false);
        if (res.success) {
          toast({
            title: "Success",
            description: res.message,
            variant: "success",
          });
        } else {
          setCvError(res.message);
          toast({
            title: "Error",
            description: res.message,
            variant: "error",
          });
        }
      });
    }
    e.target.value = "";
  };

  const handleSave = async () => {
    if (photoFile) {
      const resPhoto = await uploadPhoto(photoFile);
      if (resPhoto.success) {
        toast({
          title: "Success",
          description: resPhoto.message,
          variant: "success",
        });
        setPhotoFile(null);
        setPreview(null);
      } else {
        setError(resPhoto.message);
        toast({
          title: "Error",
          description: resPhoto.message,
          variant: "error",
        });
        return;
      }
    }

    const res = await updateProfile(form);
    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
        variant: "success",
      });
    } else {
      toast({ title: "Error", description: res.message, variant: "error" });
      return;
    }

    if (JSON.stringify(tags) !== JSON.stringify(initialTags)) {
      const tagRes = await updateTagPreferences(tags);
      if (tagRes.success) {
        toast({
          title: "Success",
          description: tagRes.message,
          variant: "success",
        });
        setInitialTags(tags);
      } else {
        toast({
          title: "Error",
          description: tagRes.message,
          variant: "error",
        });
      }
    }
    setIsEditing(false);
    fetchProfile();
  };

  const cvUrl = profile?.cvUrl;
  const cvFileName = cvUrl
    ? decodeURIComponent(cvUrl.split("/").pop() || "")
    : "";

  return (
    <div className="min-h-screen bg-gray-50">
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
                  <Link href="/dashboard" className="w-full">
                    Job list
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-gray-100 md:hidden">
                  <Link href="/cv-analysis" className="w-full">
                    CV Analysis
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

      {!profile ? (
        <ProfilePageSkeleton />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
          {/* User Header */}
          <Card className="mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
                {/* Foto/profile */}
                <div
                  onClick={isEditing ? handlePhotoClick : undefined}
                  className={`w-20 sm:w-24 h-20 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isEditing ? "hover:scale-105 cursor-pointer" : ""
                  } flex-shrink-0 overflow-hidden group relative`}
                  title={isEditing ? "Change profile photo" : ""}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : profile?.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 sm:w-12 h-10 sm:h-12 text-gray-600" />
                  )}
                  {/* Overlay for edit */}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-all">
                        Change
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={inputRef}
                    onChange={handlePhotoChange}
                  />
                </div>
                {/* Info user */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {profile?.fullname}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 mb-2">
                    {profile?.user?.email}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      {!profile?.domicile ? "-" : profile?.domicile}
                    </span>
                  </div>
                  {error && (
                    <div className="text-red-500 text-xs mt-2">{error}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Personal Information */}
              <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="text-xl lg:text-2xl">
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (isEditing) handleSave();
                      else setIsEditing(true);
                    }}
                    className="transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={form.fullname}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, fullname: e.target.value }))
                        }
                        className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={form.domicile}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, domicile: e.target.value }))
                        }
                        className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile?.user?.email || ""}
                        disabled
                        className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="portfolioUrl"
                      className="text-sm font-medium"
                    >
                      Portfolio URL
                    </Label>
                    <Input
                      id="portfolioUrl"
                      value={form.portfolioUrl}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, portfolioUrl: e.target.value }))
                      }
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Job Preferences */}
              <Card className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl">
                    Job Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 lg:space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="education" className="text-sm font-medium">
                      Last Education
                    </Label>
                    <Input
                      id="education"
                      value={form.lastEducation}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          lastEducation: e.target.value,
                        }))
                      }
                      className="transition-all duration-300 focus:ring-2 focus:ring-[#4A90A4]/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <TagInput
                      id="jobCategories"
                      label="Tag Preferences"
                      value={tags}
                      onChange={setTags}
                      disabled={!isEditing}
                      placeholder="Type then press Enter..."
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
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-[#4A90A4] transition-transform duration-300 hover:scale-110 flex-shrink-0" />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        {cvUrl ? (
                          <a
                            href={cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block font-medium text-sm sm:text-base truncate underline decoration-dotted hover:text-[#4A90A4]"
                            title={cvFileName}
                          >
                            {cvFileName}
                          </a>
                        ) : (
                          <span className="font-medium text-sm sm:text-base text-gray-400">
                            No CV uploaded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {cvError && (
                    <div className="text-red-500 text-xs mb-2">{cvError}</div>
                  )}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center"
                      disabled={isUploadingCV}
                      onClick={handleCvUploadClick}
                    >
                      {isUploadingCV ? (
                        <>
                          <span className="w-4 h-4 mr-2 border-2 border-[#4A90A4] border-t-transparent rounded-full animate-spin"></span>
                          Uploading...
                        </>
                      ) : cvUrl ? (
                        "Replace CV"
                      ) : (
                        "Upload CV"
                      )}
                    </Button>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      ref={cvInputRef}
                      onChange={handleCvChange}
                    />
                    {cvUrl && (
                      <Button
                        variant="destructive"
                        className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base flex items-center justify-center mt-2"
                        disabled={isDeletingCV}
                        onClick={handleDeleteCV}
                      >
                        {isDeletingCV ? (
                          <>
                            <span className="w-4 h-4 mr-2 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></span>
                            Deleting...
                          </>
                        ) : (
                          "Delete CV"
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Saved Jobs */}
              <Card className="animate-in fade-in slide-in-from-right-4 duration-700 delay-300 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl lg:text-2xl">
                    Saved Jobs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.bookmarkJobs
                    .sort(
                      (a, b) =>
                        parseFloat((b.scoreMatch ?? "0").replace("%", "")) -
                        parseFloat((a.scoreMatch ?? "0").replace("%", ""))
                    )
                    .slice(0, 3)
                    .map((job, index) => (
                      <Link
                        key={index}
                        href={`/jobs/${job._id}`}
                        target="_blank"
                        className="block"
                      >
                        <div
                          className={`border rounded-lg p-4 border-l-4 ${getMatchScoreBorderColor(
                            job.scoreMatch
                          )} 
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
                                  job.scoreMatch
                                )} transition-all duration-500 group-hover:scale-125 group-hover:shadow-xl ${getMatchScoreGlow(
                                  job.scoreMatch
                                )} flex-shrink-0 group-hover:animate-pulse relative z-10`}
                              >
                                <span className="text-white font-bold text-xs sm:text-sm">
                                  {job.scoreMatch == null
                                    ? "-"
                                    : job.scoreMatch}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium mb-1 transition-colors duration-300 group-hover:text-[#4A90A4] text-sm sm:text-base truncate group-hover:translate-x-1 transform">
                                  {job.jobPosition}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700 truncate font-medium">
                                  {job.company.name}
                                </p>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10"></div>
                            </div>

                            {/* Progress bar at bottom */}
                            <div className="w-full bg-gray-200 rounded-full h-1 mt-3">
                              <div
                                className={`h-1 rounded-full transition-all duration-700 ${getMatchScoreColor(
                                  job.scoreMatch
                                ).replace(
                                  "bg-",
                                  "bg-"
                                )} transform scale-x-0 group-hover:scale-x-100 origin-left`}
                                style={{ width: `${job.scoreMatch}` }}
                              ></div>
                            </div>
                          </div>

                          {/* Bottom border animation */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4A90A4] to-[#FF8A50] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </div>
                      </Link>
                    ))}

                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base group relative overflow-hidden top-3"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {!profile?.bookmarkJobs.length && "No Saved Jobs Yet, "}
                        View All Jobs
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
      )}
    </div>
  );
}
