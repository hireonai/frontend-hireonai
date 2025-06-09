"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
      {/* User Header Skeleton */}
      <Card className="mb-6 lg:mb-8">
        <CardContent className="p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <Skeleton className="w-20 sm:w-24 h-20 sm:h-24 rounded-full" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-8 w-48 mb-3" />
              <Skeleton className="h-6 w-64 mb-2" />
              <Skeleton className="h-4 w-24 mb-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Personal Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-44 mb-2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
          {/* Job Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-40 mb-2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-36 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-7 w-28 rounded-full" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column */}
        <div className="space-y-6 lg:space-y-8">
          {/* My CV Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-28 mb-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full rounded" />
              </div>
            </CardContent>
          </Card>
          {/* Saved Jobs Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-7 w-32 mb-2" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 flex items-center space-x-4"
                >
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-5 w-36 mb-2" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-1 w-full rounded mt-2" />
                  </div>
                </div>
              ))}
              <Skeleton className="h-10 w-full rounded" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
