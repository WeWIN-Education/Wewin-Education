export type StockStatus = "OUT" | "LOW" | "IN";

export function getStockStatus(
  quantity: number,
  minQuantity: number
): {
  status: StockStatus;
  label: string;
  textColor: string;
  badgeColor: string;
  bgColor: string;
} {
  if (quantity === 0) {
    return {
      status: "OUT",
      label: "Hết hàng",
      textColor: "text-red-600",
      badgeColor: "bg-red-500 text-white",
      bgColor: "bg-red-50",
    };
  }

  if (quantity <= minQuantity) {
    return {
      status: "LOW",
      label: "Sắp hết",
      textColor: "text-yellow-600",
      badgeColor: "bg-yellow-500 text-white",
      bgColor: "bg-yellow-50",
    };
  }

  return {
    status: "IN",
    label: "Còn hàng",
    textColor: "text-green-600",
    badgeColor: "bg-green-500 text-white",
    bgColor: "bg-green-50",
  };
}
