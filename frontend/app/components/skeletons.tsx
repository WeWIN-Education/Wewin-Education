export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
    >
      <div className="skeleton-shimmer" />
    </div>
  );
}
