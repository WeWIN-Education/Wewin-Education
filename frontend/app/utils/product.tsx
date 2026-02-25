import { Product, ProductApi } from "@/types/product";
import { StockStatus } from "@/types/storage";

const mapStatus = (
  s: ProductApi["status"],
  isActive?: boolean,
): StockStatus => {
  if (isActive === false) return "CANCELLED";

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
  imageUrl: p.imageUrl,
  description: p.description,
  status: mapStatus(p.status, p.isActive),
  createdAt: p.createAt,
  updatedAt: p.updateAt,
  inventoryDocumentId: p.inventoryDocumentId,
  categoryId: p.categoryId,
});
