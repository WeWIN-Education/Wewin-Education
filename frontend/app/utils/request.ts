import { Type } from "@/types/storage";

export function formatCurrency(vnd: number) {
  if (typeof vnd !== "number") return "";
  return vnd.toLocaleString("vi-VN") + " đ";
}

export function typeLabel(type: Type) {
  return type === "IN" ? "Nhập kho" : "Xuất kho";
}

export function statusLabel(status: string) {
  const map: Record<string, string> = {
    REQUESTED: "Đã gửi",
    APPROVED: "Đã duyệt",
    ORDER_REQUEST: "Yêu cầu đặt hàng",
    ORDER_APPROVED: "Đã đặt hàng",
    CANCELLED: "Đã huỷ",
    SUCCESS: "Hoàn tất",
  };

  return map[status] ?? status;
}