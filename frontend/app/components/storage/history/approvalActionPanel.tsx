"use client";

import { useMemo, useState } from "react";
import { Purchase_Order_Items, Type } from "@/types/storage";
import { findProductById } from "@/lib/constants/storage/request/selectors";

export function ApprovalActionPanel({
  requestType,
  items,
}: {
  requestType: Type;
  items: Purchase_Order_Items[];
}) {
  const [note, setNote] = useState("");

  const notEnoughList = useMemo(() => {
    if (requestType !== "OUT") return [];
    return items
      .map((it) => {
        const p = findProductById(it.productId);
        const stock = p?.quantity ?? 0;
        return { it, p, stock, notEnough: it.quantityRequest > stock };
      })
      .filter((x) => x.notEnough);
  }, [items, requestType]);

  const disableApprove = notEnoughList.length > 0;

  return (
    <div className="bg-white rounded-2xl border shadow-lg p-6 space-y-4 md:sticky md:top-24">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
        ⚡ Hành động duyệt
      </h3>

      {disableApprove && (
        <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg text-sm text-red-700">
          <strong>Không thể duyệt</strong> – tồn kho không đủ:
          <ul className="list-disc pl-5 mt-2">
            {notEnoughList.map(({ it, p, stock }) => (
              <li key={`${it.orderId}-${it.productId}`}>
                {p?.name ?? it.productId}: yêu cầu {it.quantityRequest}, tồn{" "}
                {stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      <textarea
        className="w-full border rounded-xl p-3 min-h-30"
        placeholder="Ghi chú (bắt buộc khi từ chối)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button className="btn-danger px-6">Từ chối</button>
        <button
          className={`btn-primary px-8 ${
            disableApprove ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disableApprove}
        >
          Duyệt
        </button>
      </div>

      {requestType === "OUT" && (
        <div className="text-xs text-gray-500">
          Quy tắc: chỉ duyệt khi tồn kho ≥ số lượng yêu cầu.
        </div>
      )}
    </div>
  );
}
