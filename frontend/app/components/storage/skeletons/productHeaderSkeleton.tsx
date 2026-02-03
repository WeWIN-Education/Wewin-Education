import { Skeleton } from "../../skeletons";

export function ProductInfoCardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white rounded-2xl p-6 border border-gray-100 shadow-lg space-y-4">

      {/* Top section */}
      <div className="flex gap-4">
        <Skeleton className="w-14 h-14 rounded-xl" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 my-2" />

      {/* Bottom section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="h-8 w-36 rounded-lg" />
      </div>
    </div>
  );
}
