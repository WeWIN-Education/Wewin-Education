import { formatDateTimeFull } from "@/app/utils/format";
import { Inventory_Docment } from "@/types/storage";

export function RequestTimeline({ docs }: { docs: Inventory_Docment[] }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h3 className="font-semibold mb-6">Quá trình xử lý</h3>

      {/* ===== TIMELINE WRAPPER ===== */}
      <ol className="relative border-l border-gray-200 ml-6">
        {docs.map((d, index) => (
          <li
            key={d.id}
            className="relative mb-6 pl-8"
          >
            {/* ===== NUMBER DOT (FIXED) ===== */}
            <span
              className="
                absolute
                -left-3.5
                top-0.5
                w-7 h-7
                rounded-full
                bg-blue-600
                text-white
                flex items-center justify-center
                text-xs font-semibold
                ring-4 ring-white
              "
            >
              {index + 1}
            </span>

            {/* ===== CONTENT ===== */}
            <div className="font-medium text-gray-800 leading-6">
              {d.note || "Cập nhật"}
            </div>

            <div className="text-sm text-gray-500 mt-0.5">
              {d.createdBy?.name ?? "—"} •{" "}
              {formatDateTimeFull(d.createdAt)}
            </div>
          </li>
        ))}

        {docs.length === 0 && (
          <div className="text-sm text-gray-500 ml-2">
            Chưa có lịch sử xử lý.
          </div>
        )}
      </ol>
    </div>
  );
}
