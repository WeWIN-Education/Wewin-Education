"use client";

import { formatDateTimeFull } from "@/app/utils/format";
import { Inventory_Docment } from "@/types/storage";
import { useState } from "react";

export function RequestTimeline({ docs }: { docs: Inventory_Docment[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (docs.length === 0) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h3 className="font-semibold mb-6 text-lg">Quá trình xử lý</h3>
        <div className="text-sm text-gray-500">Chưa có lịch sử xử lý.</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h3 className="font-semibold mb-6 text-lg">Quá trình xử lý</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Timeline */}
        <div>
          <ol className="relative border-l border-gray-200 ml-6">
            {docs.map((d, index) => (
              <li
                key={d.id}
                className="relative mb-6 pl-8 cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Number Dot */}
                <span
                  className={`
                    absolute -left-3.5 top-0.5 w-7 h-7 rounded-full
                    flex items-center justify-center text-xs font-semibold
                    ring-4 ring-white transition-all
                    ${
                      selectedIndex === index
                        ? "bg-blue-600 text-white scale-110"
                        : "bg-gray-300 text-gray-700 group-hover:bg-blue-500 group-hover:text-white"
                    }
                  `}
                >
                  {index + 1}
                </span>

                {/* Content */}
                <div
                  className={`transition-all ${
                    selectedIndex === index ? "font-semibold" : "font-medium"
                  } text-gray-800 leading-6`}
                >
                  {d.note || "Cập nhật"}
                </div>

                <div className="text-sm text-gray-500 mt-0.5">
                  {d.createdBy?.name ?? "—"} 
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* RIGHT: Details Panel */}
        <div className="lg:border-l lg:pl-8">
          <div className="sticky top-6">
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-semibold text-gray-900">
                  Chi tiết bước {selectedIndex + 1}
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-1">
                    Hành động
                  </div>
                  <div className="text-sm text-gray-900">
                    {docs[selectedIndex].note || "Cập nhật"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Người thực hiện
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {docs[selectedIndex].createdBy?.name ?? "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Thời gian tạo
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTimeFull(docs[selectedIndex].createdAt)}
                    </div>
                  </div>
                </div>

                {docs[selectedIndex].updatedAt !== docs[selectedIndex].createdAt && (
                  <div className="pt-4 border-t border-blue-200">
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Cập nhật lần cuối
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatDateTimeFull(docs[selectedIndex].updatedAt)}
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                <div className="pt-4 border-t border-blue-200">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Tiến độ</span>
                    <span className="font-medium">
                      {selectedIndex + 1}/{docs.length}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((selectedIndex + 1) / docs.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                disabled={selectedIndex === 0}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Trước
              </button>
              <button
                onClick={() =>
                  setSelectedIndex(Math.min(docs.length - 1, selectedIndex + 1))
                }
                disabled={selectedIndex === docs.length - 1}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Sau →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}