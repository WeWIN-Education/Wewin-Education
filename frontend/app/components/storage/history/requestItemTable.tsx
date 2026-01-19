"use client";

import { useMemo, useState } from "react";
import ReusableTable from "@/app/components/table";
import { Pagination, RowsPerPage } from "@/app/components/pagination";
import { Purchase_Order_Items, ApprovalStatus } from "@/types/storage";
import { findProductById } from "@/lib/constants/storage/request/selectors";
import { formatCurrency } from "@/app/utils/request";

/* ================= HELPER ================= */
function hasOrderData(it: Purchase_Order_Items) {
  return it.quantityOrdered !== undefined;
}

/* ================= COMPONENT ================= */
export function RequestItemsTable({
  items,
  orderStatus,
}: {
  items: Purchase_Order_Items[];
  orderStatus: ApprovalStatus;
}) {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<RowsPerPage>(5);

  const pageSize = rows === "all" ? items.length : rows;
  const totalPages = rows === "all" ? 1 : Math.ceil(items.length / pageSize);

  const sliced = useMemo(() => {
    if (rows === "all") return items;
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize, rows]);

  const showOrder =
    orderStatus === "ORDER_REQUEST" ||
    orderStatus === "ORDER_APPROVED" ||
    orderStatus === "SUCCESS";

  return (
    <div>
      {/* ================= TABLE ================= */}
      <ReusableTable<Purchase_Order_Items>
        data={sliced}
        getKey={(it) => `${it.orderId}-${it.productId}`}
        columns={[
          "Sản phẩm",
          "SL",
          "Giá yêu cầu",
          "VAT (YC)",
          "Tổng (YC)",
          ...(showOrder ? ["Giá đặt", "VAT (Đặt)", "Tổng (Đặt)"] : []),
          "Ghi chú",
        ]}
        emptyText="Phiếu chưa có sản phẩm"
        /* ================= DESKTOP ================= */
        renderRow={(it) => {
          const p = findProductById(it.productId);
          const orderExists = hasOrderData(it);

          return (
            <>
              {/* SẢN PHẨM */}
              <td className="px-6 py-4 text-left">
                <div className="font-medium">{p?.name ?? "—"}</div>
                <div className="text-xs text-gray-500">
                  {p?.code} • {p?.unit}
                </div>
              </td>

              {/* ===== SỐ LƯỢNG ===== */}
              <td className="text-center font-semibold">
                {orderExists ? (
                  <span>
                    {it.quantityRequest} →{" "}
                    <span className="text-green-700">{it.quantityOrdered}</span>
                  </span>
                ) : (
                  it.quantityRequest
                )}
              </td>

              {/* ===== REQUEST ===== */}
              <td className="text-center">
                {formatCurrency(it.unitPriceRequest)}
              </td>

              <td className="text-center">
                {formatCurrency(it.vatPriceRequest)}
              </td>

              <td className="text-center font-semibold text-blue-700">
                {formatCurrency(it.totalPriceRequest)}
              </td>

              {/* ===== ORDER ===== */}
              {showOrder && (
                <>
                  <td className="text-center">
                    {orderExists
                      ? formatCurrency(it.unitPriceOrdered ?? 0)
                      : "—"}
                  </td>

                  <td className="text-center">
                    {orderExists
                      ? formatCurrency(it.vatPriceOrdered ?? 0)
                      : "—"}
                  </td>

                  <td className="text-center font-semibold text-green-700">
                    {orderExists
                      ? formatCurrency(it.totalPriceOrdered ?? 0)
                      : "—"}
                  </td>
                </>
              )}

              {/* NOTE */}
              <td className="px-6 py-4 text-left">
                <div className="text-sm">{it.noteRequest ?? ""}</div>
                {orderExists && it.noteOrdered && (
                  <div className="mt-1 text-xs text-gray-500">
                    Đặt: {it.noteOrdered}
                  </div>
                )}
              </td>
            </>
          );
        }}
        /* ================= MOBILE ================= */
        renderMobileCard={(it) => {
          const p = findProductById(it.productId);
          const orderExists = hasOrderData(it);

          return (
            <div className="space-y-3 text-sm">
              <div className="font-semibold text-base">{p?.name ?? "—"}</div>
              <div className="text-xs text-gray-500">
                {p?.code} • {p?.unit}
              </div>

              <div>
                SL:{" "}
                {orderExists ? (
                  <span>
                    {it.quantityRequest} →{" "}
                    <span className="font-semibold text-green-700">
                      {it.quantityOrdered}
                    </span>
                  </span>
                ) : (
                  <b>{it.quantityRequest}</b>
                )}
              </div>

              {/* REQUEST */}
              <div className="rounded-lg border p-2">
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  YÊU CẦU
                </div>
                <div>Giá: {formatCurrency(it.unitPriceRequest)}</div>
                <div>VAT: {formatCurrency(it.vatPriceRequest)}</div>
                <div className="font-semibold">
                  Tổng: {formatCurrency(it.totalPriceRequest)}
                </div>
              </div>

              {/* ORDER */}
              {showOrder && (
                <div className="rounded-lg border p-2">
                  <div className="text-xs font-semibold text-gray-600 mb-1">
                    ĐẶT HÀNG
                  </div>
                  {orderExists ? (
                    <>
                      <div>Giá: {formatCurrency(it.unitPriceOrdered ?? 0)}</div>
                      <div>VAT: {formatCurrency(it.vatPriceOrdered ?? 0)}</div>
                      <div className="font-semibold text-green-700">
                        Tổng: {formatCurrency(it.totalPriceOrdered ?? 0)}
                      </div>
                    </>
                  ) : (
                    <div className="text-gray-400 italic">
                      Chưa có dữ liệu đặt hàng
                    </div>
                  )}
                </div>
              )}

              {it.noteRequest && (
                <div className="text-gray-500">Ghi chú: {it.noteRequest}</div>
              )}
            </div>
          );
        }}
      />

      {/* ================= PAGINATION ================= */}
      {items.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          startIndex={(page - 1) * pageSize}
          endIndex={(page - 1) * pageSize + sliced.length}
          total={items.length}
          selectedRows={rows}
          text="sản phẩm"
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          onRowsChange={(e) => {
            const v = e.target.value === "all" ? "all" : Number(e.target.value);
            setRows(v);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
