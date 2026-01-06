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
    PENDING: "Chờ duyệt",
    APPROVED: "Đã duyệt",
    REJECTED: "Từ chối",
    COMPLETED: "Hoàn tất",
  };
  return map[status] ?? status;
}
