import { Purchase_Orders } from "@/types/storage";
import { ApprovalStatusBadge } from "./requestBadge";
import { typeLabel } from "@/app/utils/request";
import { formatDateTimeFull } from "@/app/utils/format";

export function RequestDetailHeader({ po }: { po: Purchase_Orders }) {
  return (
    <div className="relative bg-white rounded-2xl border shadow-md p-6 overflow-hidden">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#0E4BA9] to-[#007BCE]" />

      <div className="flex flex-col gap-4 pl-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {po.code}
          </h1>
          <ApprovalStatusBadge status={po.status} />
        </div>

        <div>
          <div className="font-medium text-gray-800">{po.name}</div>
          {po.note && (
            <div className="text-sm text-gray-600 mt-1">{po.note}</div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
            {typeLabel(po.type)}
          </span>
          <span>👤 {po.createdBy?.name ?? "—"}</span>
          <span>🕒 {formatDateTimeFull(po.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
