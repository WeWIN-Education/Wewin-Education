import { Purchase_Orders } from "@/types/storage";
import { ApprovalStatusBadge } from "./requestBadge";
import { typeLabel } from "@/app/utils/request";
import { formatDateTimeFull } from "@/app/utils/format";

export function RequestDetailHeader({ po }: { po: Purchase_Orders }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-[#0E4BA9] to-[#007BCE]" />

      <div className="p-6 pl-8">
        {/* Top row: Code, Status, Type */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <h1 className="text-3xl font-bold text-[#0E4BA9]">
            {po.code}
          </h1>
          
          <ApprovalStatusBadge status={po.status} />
          
          {/* Type badge with different color scheme */}
          <span className="px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium text-sm whitespace-nowrap">
            📦 {typeLabel(po.type)}
          </span>
        </div>

        {/* Content row: 3 sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Title and Note (5 columns) */}
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {po.name}
            </h2>
            
            {po.note && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {po.note}
              </p>
            )}
          </div>
          
          {/* Middle: Meta info (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium text-gray-700">
                {po.createdBy?.name ?? "—"}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-600">
                {formatDateTimeFull(po.createdAt)}
              </span>
            </div>
          </div>
          
          {/* Right: Empty space (3 columns) */}
          <div className="lg:col-span-3"></div>
        </div>
      </div>
    </div>
  );
}