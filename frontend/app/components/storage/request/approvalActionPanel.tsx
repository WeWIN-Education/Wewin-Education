"use client";

import { useMemo, useState } from "react";
import { Purchase_Order_Items, Type } from "@/types/storage";
import { findProductById } from "@/lib/constants/storage/request/selectors";

export function ApprovalActionPanel({
  requestId,
  requestType,
  items,
}: {
  requestId: string;
  requestType: Type;
  items: Purchase_Order_Items[];
}) {
  const [note, setNote] = useState("");

  // Rule: nếu OUT mà có item vượt tồn kho => disable approve
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

  const onApprove = () => {
    // TODO: call API:
    // PUT /purchase-orders/:id/approve  (backend bạn làm sau)
    console.log("APPROVE", { requestId, note });
    alert("Đã duyệt (demo). Nối API ở đây.");
  };

  const onReject = () => {
    if (!note.trim()) {
      alert("Vui lòng nhập ghi chú khi từ chối.");
      return;
    }
    // TODO: call API:
    // PUT /purchase-orders/:id/reject
    console.log("REJECT", { requestId, note });
    alert("Đã từ chối (demo). Nối API ở đây.");
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-3">
      <h3 className="font-semibold">Hành động duyệt</h3>

      {disableApprove && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Không thể duyệt vì <strong>tồn kho không đủ</strong> cho các sản phẩm sau:
          <ul className="list-disc pl-5 mt-2">
            {notEnoughList.map(({ it, p, stock }) => (
              <li key={`${it.orderId}-${it.productId}`}>
                {p?.name ?? it.productId}: yêu cầu {it.quantityRequest}, tồn {stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      <textarea
        className="w-full border rounded-lg p-3 min-h-[110px]"
        placeholder="Ghi chú (bắt buộc khi từ chối)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <button onClick={onReject} className="btn-danger">
          Từ chối
        </button>

        <button onClick={onApprove} className="btn-primary" disabled={disableApprove} aria-disabled={disableApprove}>
          Duyệt
        </button>
      </div>

      {requestType === "OUT" ? (
        <div className="text-xs text-gray-500">
          Quy tắc: OUT chỉ được duyệt khi tất cả items có tồn kho hiện tại ≥ số lượng yêu cầu.
        </div>
      ) : null}
    </div>
  );
}
