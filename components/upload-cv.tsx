"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileStore } from "@/store/profile";
import { useToast } from "@/hooks/use-toast";

/**
 * Komponen UploadCV: untuk upload file PDF ke backend.
 * - Hanya bisa upload jika sudah login.
 * - File harus PDF, maksimal 5MB.
 * - Setelah upload sukses, menampilkan link CV dari profile store.
 * - Jika belum login, tombol upload dan drag-drop disable, serta muncul toast.
 * - Notifikasi sukses/gagal via toast dan pesan bawah.
 *
 * Props:
 * - isLoggedIn: boolean
 * - onFileChange?: (file: File) => Promise<void>
 * - onRequireLogin?: () => void
 */
export interface UploadCVProps {
  isLoggedIn: boolean;
  onFileChange?: (file: File) => Promise<void>;
  onRequireLogin?: () => void;
}

export function UploadCV({
  isLoggedIn,
  onFileChange,
  onRequireLogin,
}: UploadCVProps) {
  const { toast } = useToast();
  const profile = useProfileStore((state) => state.profile);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setError(null);
    setSuccess(false);
    setSelectedFile(null);
  }, [profile?._id]);

  function validateFile(file: File) {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return false;
    }
    setError(null);
    return true;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(false);
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      await upload(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      await upload(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleBrowseClick = (e?: React.MouseEvent) => {
    if (!isLoggedIn) {
      onRequireLogin?.();
      return;
    }
    inputRef.current?.click();
  };

  const upload = async (file: File) => {
    setLoading(true);
    try {
      if (onFileChange) {
        await onFileChange(file);
      }
      setSuccess(true);
      setError(null);
      setSelectedFile(null);
    } catch (err: any) {
      setSuccess(false);
      setError(err?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const cvUrl = profile?.cvUrl;

  return (
    <div>
      <h3 className="font-semibold mb-4 text-sm lg:text-base">Upload CV</h3>
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center transition-all duration-300 hover:border-[#4A90A4] hover:bg-gray-50 group`}
        onDrop={isLoggedIn ? handleDrop : (e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
        style={{ cursor: isLoggedIn ? "pointer" : "not-allowed" }}
      >
        <div className="flex flex-col items-center">
          {loading ? (
            <Loader2 className="w-8 h-8 text-[#4A90A4] animate-spin mb-2" />
          ) : (
            <Upload className="w-6 lg:w-8 h-6 lg:h-8 text-gray-400 mx-auto mb-2 transition-all duration-300 group-hover:text-[#4A90A4] group-hover:scale-110" />
          )}
          <p className="text-xs lg:text-sm text-gray-600 mb-2">
            Drag & drop your CV here <br />
            (PDF, max 5MB)
          </p>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#163B56] text-white hover:bg-white hover:text-[#163B56] transition-all duration-300 hover:scale-105 text-xs lg:text-sm mt-1"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick(e);
            }}
            disabled={loading || !isLoggedIn}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
              </span>
            ) : (
              "Browse Files"
            )}
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading || !isLoggedIn}
          />
          {selectedFile && !error && (
            <div className="mt-4 text-xs text-gray-700">
              Selected File: {selectedFile.name}
            </div>
          )}
          {!isLoggedIn && (
            <div className="mt-3 text-xs text-red-600 font-medium">
              Need to be logged in.
            </div>
          )}
          {error && (
            <div className="mt-3 text-xs text-red-600 font-medium">{error}</div>
          )}
          {success && (
            <div className="mt-3 text-xs text-green-700 font-medium">
              CV uploaded!
            </div>
          )}
          {cvUrl && (
            <div className="mt-4 text-xs text-gray-700">
              <div className="font-semibold mb-1">
                Your current CV listed on your profile:
              </div>
              <p className="text-[#4A90A4]">{cvUrl.split("/").slice(-1)[0]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
