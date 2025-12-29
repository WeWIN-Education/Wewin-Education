export interface Product {
  id: string;
  name: string;
  categoryId: string;  // FK → Category.id
  unit: string;
  quantity: number;   // TỒN KHO HIỆN TẠI
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export interface InventoryDocument {
  id: string;
  type: InventoryDocumentType;
  createdBy: string;   // FK → User.id
  note?: string;
  createdAt: string;   // ISO
}

export type InventoryDocumentType = "IN" | "OUT";

export interface InventoryDocumentItem {
  id: string;
  documentId: string;
  productId: string;
  quantity: number; // SỐ LƯỢNG CỦA LẦN NHẬP / XUẤT
}

export interface InventoryDocument {
  id: string;
  type: InventoryDocumentType; // IN | OUT
  createdBy: string;           // userId
  note?: string;
  createdAt: string;           // ISO date
}

export interface InventoryDocumentURL {
  id: string;
  documentId: string;
  imageUrl: string;
  description?: string;
}
