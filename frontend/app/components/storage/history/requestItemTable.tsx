"use client";

import { useMemo, useState } from "react";
import ReusableTable from "@/app/components/table";
import { Pagination, RowsPerPage } from "@/app/components/pagination";
import { Purchase_Order_Items, ApprovalStatus } from "@/types/storage";
import { findProductById } from "@/lib/constants/storage/request/selectors";
import { formatCurrency } from "@/app/utils/request";
import { ClipboardList, FileText } from "lucide-react";

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
          "Số lượng",
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
              <td className="px-6 py-4 text-left space-y-3">
                {/* NOTE REQUEST */}
                {it.noteRequest && (
                  <div className="relative rounded-lg bg-blue-50 border border-blue-200 p-3">
                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg" />

                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700">
                        GHI CHÚ YÊU CẦU
                      </span>
                    </div>

                    <div className="text-sm text-gray-800 leading-relaxed">
                      {it.noteRequest}
                    </div>
                  </div>
                )}

                {/* NOTE ORDER */}
                {orderExists && it.noteOrdered && (
                  <div className="relative rounded-lg bg-green-50 border border-green-200 p-3">
                    <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-lg" />

                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardList size={14} className="text-green-600" />
                      <span className="text-xs font-semibold text-green-700">
                        GHI CHÚ ĐẶT HÀNG
                      </span>
                    </div>

                    <div className="text-sm text-gray-800 leading-relaxed">
                      {it.noteOrdered}
                    </div>
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

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500 font-medium">Số Lượng:</span>

                {orderExists ? (
                  <>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {it.quantityRequest}
                    </span>

                    <span className="text-gray-400">→</span>

                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                      {it.quantityOrdered}
                    </span>
                  </>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    {it.quantityRequest}
                  </span>
                )}
              </div>

              {/* REQUEST */}
              <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg" />

                <div className="text-xs font-semibold text-blue-500 mb-1">
                  YÊU CẦU
                </div>

                <div>Giá: {formatCurrency(it.unitPriceRequest)}</div>
                <div>VAT: {formatCurrency(it.vatPriceRequest)}</div>
                <div className="font-semibold text-blue-500">
                  Tổng: {formatCurrency(it.totalPriceRequest)}
                </div>
              </div>

              {/* ORDER */}
              {showOrder && (
                <div className="relative rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l-lg" />

                  <div className="text-xs font-semibold text-green-500 mb-1">
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
            setRows(e);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
