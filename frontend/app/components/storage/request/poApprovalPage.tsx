"use client";

import ProductOrderCard from "@/app/components/storage/request/requestCard";
import { Purchase_Orders } from "@/types/storage";
import PageToolbar from "../../toolBar";

export default function ProductOrderApprovalPage({
  data = [],
}: {
  data: Purchase_Orders[];
}) {
  const requestedOrders = data.filter((o) => o.status === "REQUESTED");

  return (
    <div className="space-y-6 px-8 py-8 text-black">
      {/* ===== HEADER ===== */}
      <PageToolbar title="Duyệt yêu cầu" subtitle="Các đơn nhập / xuất kho đang chờ duyệt" />

      {/* ===== EMPTY STATE ===== */}
      {requestedOrders.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          Không có đơn hàng nào cần duyệt
        </div>
      )}

      {/* ===== LIST ===== */}
      <div className="space-y-4">
        {requestedOrders.map((order) => (
          <ProductOrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
