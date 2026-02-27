import { Product } from "@/types/product";
import { StockStatus } from "@/types/storage";

export type TableRow = Product & { categoryName: string; minQuantity: number };

export function getStockStatus(status: StockStatus): {
  status: StockStatus;
  label: string;
  textColor: string;
  badgeColor: string;
  bgColor: string;
} {
  switch (status) {
    case "CANCELLED":
      return {
        status: "CANCELLED",
        label: "Đã huỷ",
        textColor: "text-gray-500",
        badgeColor: "bg-gray-400 text-white",
        bgColor: "bg-gray-50",
      };

    case "OUT_OF_STOCK":
      return {
        status: "OUT_OF_STOCK",
        label: "Hết hàng",
        textColor: "text-red-600",
        badgeColor: "bg-red-500 text-white",
        bgColor: "bg-red-50",
      };

    case "LOW_STOCK":
      return {
        status: "LOW_STOCK",
        label: "Sắp hết",
        textColor: "text-yellow-600",
        badgeColor: "bg-yellow-500 text-white",
        bgColor: "bg-yellow-50",
      };

    case "IN_STOCK":
    default:
      return {
        status: "IN_STOCK",
        label: "Còn hàng",
        textColor: "text-green-600",
        badgeColor: "bg-green-500 text-white",
        bgColor: "bg-green-50",
      };
  }
}

export function getMobileStatus(row: Pick<TableRow, "status">) {
  const stock = getStockStatus(row.status);
  return { label: stock.label, color: stock.textColor };
}
