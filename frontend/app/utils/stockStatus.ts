import { Product } from "@/types/product";
import { StockStatus } from "@/types/storage";

export type TableRow = Product & { categoryName: string; minQuantity: number };

export function getStockStatus(
  status: StockStatus,
  quantity: number,
  minQuantity: number,
): {
  status: StockStatus;
  label: string;
  textColor: string;
  badgeColor: string;
  bgColor: string;
} {
  // ✅ ưu tiên cao nhất
  if (status === "CANCELLED") {
    return {
      status: "CANCELLED",
      label: "Đã huỷ",
      textColor: "text-gray-500",
      badgeColor: "bg-gray-400 text-white",
      bgColor: "bg-gray-50",
    };
  }

  // tồn kho thực tế (nếu muốn, bạn có thể bỏ 2 điều kiện dưới và chỉ dùng status)
  if (quantity === 0) {
    return {
      status: "OUT_OF_STOCK",
      label: "Hết hàng",
      textColor: "text-red-600",
      badgeColor: "bg-red-500 text-white",
      bgColor: "bg-red-50",
    };
  }

  if (quantity <= minQuantity) {
    return {
      status: "LOW_STOCK",
      label: "Sắp hết",
      textColor: "text-yellow-600",
      badgeColor: "bg-yellow-500 text-white",
      bgColor: "bg-yellow-50",
    };
  }

  return {
    status: "IN_STOCK",
    label: "Còn hàng",
    textColor: "text-green-600",
    badgeColor: "bg-green-500 text-white",
    bgColor: "bg-green-50",
  };
}

export function getMobileStatus(row: TableRow) {
  if (row.status === "CANCELLED") {
    return { label: "Đã huỷ", color: "text-gray-500" };
  }

  if (row.quantity === 0) return { label: "Hết hàng", color: "text-red-600" };
  if (row.quantity <= row.minQuantity)
    return { label: "Sắp hết", color: "text-yellow-600" };
  return { label: "Còn hàng", color: "text-green-600" };
}
