import { StatTone } from "./statCard";

export type StatKey =
  | "totalItems"
  | "totalQuantity"
  | "lowStock"
  | "outOfStock";

/**
 * Quyết định tone dựa trên loại stat + giá trị
 * 👉 dùng lại cho Inventory, KPI, Dashboard...
 */
export function getStatTone(
  key: StatKey,
  value: number
): StatTone {
  switch (key) {
    case "totalItems":
      return "neutral";

    case "totalQuantity":
      return value > 0 ? "positive" : "negative";

    case "lowStock":
      return value > 0 ? "warning" : "neutral";

    case "outOfStock":
      return value > 0 ? "negative" : "neutral";

    default:
      return "neutral";
  }
}
