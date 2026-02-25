import { Inventory_Docment_Items } from "@/types/storage";
import { MOCK_PRODUCTS } from "./product";

export const MOCK_INVENTORY_ITEMS: Inventory_Docment_Items[] = [
  {
    id: "idi-1",
    quantity: 50,
    createdAt: "2025-01-01T08:00:00.000Z",
    updatedAt: "2025-01-01T08:00:00.000Z",
    productId: MOCK_PRODUCTS[0],
    inventoryDocumentId: "INV-001", // Admin System
  },
  {
    id: "idi-2",
    quantity: -10,
    createdAt: "2025-01-10T09:30:00.000Z",
    updatedAt: "2025-01-10T09:30:00.000Z",
    productId: MOCK_PRODUCTS[1],
    inventoryDocumentId: "INV-002", // Nguyễn Văn A
  },
];
