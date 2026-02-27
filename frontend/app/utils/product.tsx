import { Product, ProductApi } from "@/types/product";
import { StockStatus } from "@/types/storage";

const mapStatus = (s: ProductApi["status"]): StockStatus => {
  switch (s) {
    case "out_of_stock":
      return "OUT_OF_STOCK";
    case "low_stock":
      return "LOW_STOCK";
    case "in_stock":
      return "IN_STOCK";
    case "cancelled":
      return "CANCELLED";
    default:
      return "IN_STOCK";
  }
};

export const mapProductApiToProduct = (p: ProductApi): Product => ({
  id: p.id,
  code: p.code,
  name: p.name,
  unit: p.unit,
  quantity: p.quantity,
  imageUrl: p.imageUrl ?? null,
  description: p.description ?? "",
  status: mapStatus(p.status),
  createdAt: p.createAt,
  updatedAt: p.updateAt,
  inventoryDocumentId: p.inventoryDocumentId,
  categoryId: p.categoryId,
});