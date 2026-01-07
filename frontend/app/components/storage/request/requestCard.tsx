"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Check,
  X,
  Package,
  User,
  Calendar,
} from "lucide-react";
import { Purchase_Orders } from "@/types/storage";
import { typeLabel } from "@/app/utils/request";

interface Props {
  order: Purchase_Orders;
}

export default function ProductOrderCard({ order }: Props) {
  const isIn = order.type === "IN";

  return (
    <div
      className={`
        relative rounded-2xl border bg-white
        p-5 flex gap-6 items-stretch
        hover:shadow-md transition
        ${
          isIn
            ? "border-l-4 border-l-green-500"
            : "border-l-4 border-l-orange-500"
        }
      `}
    >
      {/* ===== LEFT: TYPE ===== */}
      <div className="flex flex-col items-center pt-1">
        {isIn ? (
          <ArrowDownCircle size={26} className="text-green-600" />
        ) : (
          <ArrowUpCircle size={26} className="text-orange-600" />
        )}

        <span
          className={`
            mt-2 px-2 py-0.5 rounded-full text-xs font-semibold
            ${
              isIn
                ? "bg-green-50 text-green-700"
                : "bg-orange-50 text-orange-700"
            }
          `}
        >
          {typeLabel(order.type)}
        </span>
      </div>

      {/* ===== CENTER: CONTENT ===== */}
      <div className="flex-1 space-y-2">
        {/* MÃ ĐƠN */}
        <div
          className={`flex items-center gap-2 text-lg font-semibold  ${isIn ? "text-green-700" : "text-orange-600"}`}             
        >
          <Package
            size={18}
            className={isIn ? "text-green-700" : "text-orange-700"}
          />
          Mã đơn: {order.code}
        </div>

        {/* NỘI DUNG */}
        <div className="text-gray-800">
          <span className="font-medium">Nội dung yêu cầu:</span> {order.name}
        </div>

        {/* GHI CHÚ */}
        {order.note && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Mục đích / ghi chú:</span>{" "}
            <span className="italic">“{order.note}”</span>
          </div>
        )}

        {/* META */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span className="font-medium">Người yêu cầu:</span>{" "}
            {order.createdBy?.name}
          </div>

          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span className="font-medium">Ngày gửi yêu cầu:</span>{" "}
            {new Date(order.createdAt).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </div>

      {/* ===== RIGHT: ACTIONS ===== */}
      <div className="flex flex-col justify-center gap-3 min-w-35">
        <button
          className="
            w-full flex items-center justify-center gap-1
            rounded-lg bg-green-600 px-4 py-2
            text-white font-medium
            hover:bg-green-700 transition
          "
          onClick={() => console.log("approve", order.id)}
        >
          <Check size={16} />
          Duyệt
        </button>

        <button
          className="
            w-full flex items-center justify-center gap-1
            rounded-lg border border-red-500 px-4 py-2
            text-red-600 font-medium
            hover:bg-red-50 transition
          "
          onClick={() => console.log("reject", order.id)}
        >
          <X size={16} />
          Từ chối
        </button>
      </div>
    </div>
  );
}
