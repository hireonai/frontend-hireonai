import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function JobDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Section */}
      <div className="lg:col-span-2 space-y-8">
        {/* Job Header Skeleton */}
        <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-all duration-500 group relative overflow-hidden">
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-2/3 mb-2" />
                    <Skeleton className="h-6 w-1/3 mb-4" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-500 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Company Description Skeleton */}
        <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all group">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-6 w-28" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-4/5 mb-1" />
            <Skeleton className="h-4 w-3/5" />
          </CardContent>
        </Card>

        {/* Job Description Skeleton */}
        <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600 transition-all group">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Skeleton className="h-5 w-32 mb-3" />
              <ul className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-6" />
            <div>
              <Skeleton className="h-5 w-40 mb-3" />
              <ul className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-4 w-1/2" />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Explanation Skeleton */}
        <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-700 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] group">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-5 w-28 mb-2" />
            <ul className="space-y-1">
              {[...Array(2)].map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-4 w-3/4" />
                </li>
              ))}
            </ul>
            <Skeleton className="h-5 w-32 mt-2 mb-2" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between mb-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Section */}
      <div className="space-y-6">
        {/* Cover Letter Generator Skeleton */}
        <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-300 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group relative overflow-hidden">
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="h-6 w-40" />
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-24 w-full mb-4 rounded-lg" />
            <Skeleton className="h-10 w-full mb-2 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </CardContent>
        </Card>

        {/* CV Analysis Skeleton */}
        <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-500 transition-all duration-500 hover:shadow-2xl group">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <Skeleton className="w-32 h-32 rounded-full mb-4" />
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Separator />
            <div>
              <Skeleton className="h-5 w-32 mb-3" />
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="mb-2">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-3" />
              <ul className="space-y-2">
                {[...Array(2)].map((_, i) => (
                  <li key={i}>
                    <Skeleton className="h-4 w-1/2" />
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
