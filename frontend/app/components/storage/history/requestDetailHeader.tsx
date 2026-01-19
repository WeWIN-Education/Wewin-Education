import { Purchase_Orders } from "@/types/storage";
import { ApprovalStatusBadge } from "./requestBadge";
import { typeLabel } from "@/app/utils/request";
import { formatDateTimeFull } from "@/app/utils/format";
import { User, Clock, Package, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function RequestDetailHeader({ po }: { po: Purchase_Orders }) {
  return (
    <div className="relative bg-white rounded-2xl border shadow-md p-6 overflow-hidden">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#0E4BA9] to-[#007BCE]" />

      <div className="pl-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ===== LEFT ===== */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 min-h-9">
            <h1 className="text-2xl font-bold tracking-tight leading-none">
              {po.code}
            </h1>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              <Package className="w-4 h-4" />
              {typeLabel(po.type)}
            </span>
          </div>

          <div className="min-h-8 flex items-center text-base font-medium text-gray-800">
            {po.name}
          </div>

          <div className="min-h-7 flex items-center text-sm text-gray-500">
            {po.note ? `Note: ${po.note}` : <span>&nbsp;</span>}
          </div>
        </div>

        {/* ===== RIGHT ===== */}
        <div className="flex flex-col text-sm text-gray-700">
          <div className="flex items-center gap-2 min-h-9">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Người tạo:</span>
            <span className="font-medium">{po.createdBy?.name ?? "—"}</span>
          </div>

          <div className="flex items-center gap-2 min-h-8">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500">Thời gian:</span>
            <span className="font-medium">
              {formatDateTimeFull(po.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-2 min-h-7">
            <span className="text-gray-500">Trạng thái:</span>
            <ApprovalStatusBadge status={po.status} />
          </div>
        </div>
      </div>

      {/* ===== ATTACHMENTS ===== */}
      {po.imageUrl && po.imageUrl.length > 0 && (
        <div className="mt-6 pl-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-3">
            <ImageIcon className="w-4 h-4" />
            Tài liệu đính kèm ({po.imageUrl.length})
          </div>

          <div className="flex flex-wrap gap-3">
            {po.imageUrl.map((url, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 rounded-lg border overflow-hidden cursor-pointer hover:opacity-80 transition"
                onClick={() => window.open(url, "_blank")}
              >
                <Image
                  src={url}
                  alt={`po-attachment-${idx}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
