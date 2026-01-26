import { Product, ProductApi } from "@/types/product";

export function mapProductApiToDomain(p: ProductApi): Product {
  return {
    id: p.id,
    code: p.code,
    name: p.name,
    unit: p.unit,
    quantity: p.quantity,
    imageUrl: p.imageUrl,
    status: p.status.toUpperCase() as Product['status'],

    createdAt: p.createAt,
    updatedAt: p.updateAt,

    categoryId: p.categoryId,
    inventoryDocumentId: p.inventoryDocumentId,
  };
}
