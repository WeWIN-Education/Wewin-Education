import { Skeleton } from "../../skeletons";

export default function StatCardSkeleton() {
  return (
    <div
      className="
        relative flex items-center gap-4
        rounded-2xl p-5
        bg-gray-50
        shadow-md
        border border-gray-100
      "
    >
      {/* Accent strip */}
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gray-200" />

      {/* Icon skeleton */}
      <Skeleton className="h-11 w-11 rounded-xl bg-white" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}
