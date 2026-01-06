import { formatDateTimeFull } from "@/app/utils/format";
import { Inventory_Docment } from "@/types/storage";

export function RequestTimeline({ docs }: { docs: Inventory_Docment[] }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h3 className="font-semibold mb-4">Quá trình xử lý</h3>

      <ol className="relative border-l border-gray-200 ml-3">
        {docs.map((d) => (
          <li key={d.id} className="mb-6 ml-6">
            <span className="absolute -left-3 w-6 h-6 bg-blue-100 rounded-full" />
            <div className="font-medium">{d.note || "Cập nhật"}</div>
            <div className="text-sm text-gray-500">
              {d.createdBy?.name ?? "—"} • {formatDateTimeFull(d.createdAt)}
            </div>
          </li>
        ))}

        {docs.length === 0 && (
          <div className="text-sm text-gray-500">Chưa có lịch sử xử lý.</div>
        )}
      </ol>
    </div>
  );
}
