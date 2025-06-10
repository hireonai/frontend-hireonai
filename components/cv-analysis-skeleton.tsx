import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";

export function CVAnalysisSkeleton() {
  return (
    <div className="space-y-8">
      {/* Skeleton for CV Analysis Results */}
      <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 transition-all hover:shadow-2xl group">
        <CardHeader>
          <Skeleton className="w-48 h-8 mb-2 rounded" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48 group-hover:scale-105 transition-transform duration-500">
              <Skeleton className="absolute w-full h-full rounded-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Skeleton className="w-20 h-10 rounded mb-2" />
                <Skeleton className="w-24 h-4 rounded mb-2" />
                <Badge className="mt-2 bg-gray-200 text-white animate-pulse pointer-events-none"></Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton for Score Breakdown */}
      <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 transition-all hover:shadow-xl">
        <CardHeader>
          <Skeleton className="w-40 h-8 mb-2 rounded" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="animate-in fade-in slide-in-from-left-4 duration-500 delay-[100ms] group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex justify-between mb-2 items-center">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-10 rounded" />
              </div>
              <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <Skeleton className="h-full w-1/2 rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Skeleton CV Strengths */}
        <Card className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-600 transition-all hover:shadow-xl hover:scale-[1.02] group">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-32 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[1, 2, 3].map((_, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 animate-in fade-in slide-in-from-left-2 duration-500 delay-[800ms] hover:scale-105 transition-transform duration-300 group/item"
                >
                  <Skeleton className="w-52 h-4 rounded" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Skeleton Areas for Improvement */}
        <Card className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-800 transition-all hover:shadow-xl hover:scale-[1.02] group">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-40 rounded" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[1, 2, 3].map((_, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-2 animate-in fade-in slide-in-from-right-2 duration-500 delay-[1000ms] hover:scale-105 transition-transform duration-300 group/item"
                >
                  <Skeleton className="w-52 h-4 rounded" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Skeleton Section by Section Analysis */}
      <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-[1000ms] transition-all hover:shadow-xl">
        <CardHeader>
          <Skeleton className="w-56 h-8 rounded" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="border-l-4 pl-4 animate-in fade-in slide-in-from-left-4 duration-500 delay-[100ms] hover:scale-[1.02] transition-all group cursor-pointer hover:shadow-lg hover:bg-gray-50 p-4 rounded-r-lg"
            >
              <Skeleton className="h-5 w-36 mb-2 rounded" />
              <Skeleton className="h-4 w-full mb-2 rounded" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
