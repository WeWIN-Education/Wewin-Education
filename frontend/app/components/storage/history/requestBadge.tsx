"use client";

import { statusLabel } from "@/app/utils/request";
import { typeLabel } from "@/app/utils/request";
import { Type } from "@/types/storage";

export function ApprovalStatusBadge({ status }: { status: string }) {
  const cls: Record<string, string> = {
    REQUESTED: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-teal-50 text-teal-700 border-teal-200",
    ORDER_REQUEST: "bg-purple-50 text-purple-700 border-purple-200",
    ORDER_APPROVED: "bg-indigo-50 text-indigo-700 border-indigo-200",
    CANCELLED: "bg-red-50 text-red-700 border-red-200",

    // ✅ FIX CHO HOÀN TẤT
    SUCCESS: "bg-sky-50 text-sky-700 border-sky-200",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1 rounded-full
        text-sm font-medium border
        ${cls[status] ?? "bg-gray-50 text-gray-700 border-gray-200"}
      `}
    >
      {statusLabel(status)}
    </span>
  );
}

export function RequestTypeBadge({ type }: { type: Type }) {
  const cls: Record<Type, string> = {
    IN: "bg-green-50 text-green-700 border-green-200",
    OUT: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-3 py-1
        rounded-full
        text-sm font-medium
        border
        ${cls[type]}
      `}
    >
      {typeLabel(type)}
    </span>
  );
}
