import { Skeleton } from "@/components/ui/skeleton";

export function JobListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4 lg:space-y-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="hover:shadow-2xl transition-all duration-500 border-l-4 border-l-gray-200 bg-white animate-in fade-in slide-in-from-bottom-4 group cursor-pointer rounded-lg overflow-hidden"
        >
          <div className="p-4 lg:p-6 flex flex-col sm:flex-row items-start gap-4">
            <div className="flex flex-col items-center self-center sm:self-start z-10">
              <Skeleton className="w-14 h-14 lg:w-16 lg:h-16 rounded-full" />
              <div className="h-4 w-10 mt-2 rounded bg-muted" />
            </div>
            <div className="flex-1 w-full sm:w-auto relative z-10 space-y-2">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-4 w-32 rounded" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-36 rounded" />
              </div>
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-16 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
