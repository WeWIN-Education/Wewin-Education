import { Purchase_Orders } from "@/types/storage";
import { ApprovalStatusBadge } from "./requestBadge";
import { typeLabel } from "@/app/utils/request";
import { formatDateTimeFull } from "@/app/utils/format";

export function RequestDetailHeader({ po }: { po: Purchase_Orders }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">{po.code}</h1>
            <ApprovalStatusBadge status={po.status} />
          </div>

          <div className="mt-2">
            <div className="font-medium">{po.name}</div>
            {po.note ? <div className="text-sm text-gray-600 mt-1">{po.note}</div> : null}
          </div>

          <div className="mt-4 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div><span className="text-gray-500">Loại:</span> {typeLabel(po.type)}</div>
            <div><span className="text-gray-500">Người tạo:</span> {po.createdBy?.name ?? "—"}</div>
            <div><span className="text-gray-500">Tạo lúc:</span> {formatDateTimeFull(po.createdAt)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
