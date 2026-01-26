import { Product } from "@/types/product";
import { MOCK_CATEGORIES } from "./category";
import { MOCK_INVENTORY_DOCUMENTS } from "./inventory_document";

/* =======================
   MOCK PRODUCTS
======================= */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "VT-001",
    code: "VT-001",
    name: "Bút lông bảng",
    unit: "Cây",
    quantity: 120,
    imageUrl: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800&auto=format&fit=crop",
    ],
    status: "IN_STOCK",
    createdAt: "2025-01-01T08:00:00.000Z",
    updatedAt: "2025-01-05T10:30:00.000Z",
    inventoryDocumentId: MOCK_INVENTORY_DOCUMENTS[0]?.id ?? null,
    categoryId: MOCK_CATEGORIES[0].id,
  },
];
/* =======================
   MIN QUANTITY CONFIG
======================= */
// Không nằm trong ERD Product → config riêng
export const MIN_QTY_BY_PRODUCT_ID: Record<string, number> = {
  "VT-001": 20,
  "VT-002": 10,
  "VT-003": 5,
};
