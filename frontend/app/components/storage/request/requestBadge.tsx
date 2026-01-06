"use client";

import { statusLabel } from "@/app/utils/request";

export function ApprovalStatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
    APPROVED: "bg-blue-50 text-blue-700 border-blue-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    COMPLETED: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full font-medium border ${
        cls[status] ?? "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {statusLabel(status)}
    </span>
  );
}
