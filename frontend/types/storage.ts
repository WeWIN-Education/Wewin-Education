import { User } from "./user";

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;   // TỒN KHO HIỆN TẠI
  imageUrl?: string;
  status: string;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  inventoryDocmentsId: Inventory_Docment[];  // MẢNG CÁC PHIẾU NHẬP/XUẤT HÀNG LIÊN QUAN
  categoryId: Category;  // FK → Category.id
}

export interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

export interface Purchase_Orders {
  id: string;
  code: string;
  name: string;
  note?: string;
  status: string;
  type: Type;
  createdBy: User;   // FK → User.id
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
}

export interface Purchase_Order_Items {
  productId: string;
  orderId: string; 
  quantityRequest: number;
  unitPriceRequest: number;
  vatPriceRequest: number;
  totalPriceRequest: number;
  noteRequest?: string;
  quantityOrdered?: number;
  unitPriceOrdered?: number;
  vatPriceOrdered?: number;
  totalPriceOrdered?: number;
  noteOrdered?: string;
}

export interface Inventory_Docment {
  id: string;
  note?: string;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
  createdBy: User;   // FK → User.id
}

export interface Inventory_Docment_Items {
  id: string;
  quantity: number;
  creadedAt: string;
  updatedAt: string;
  productId: Product;           // giữ nguyên
  inventoryDocumentId: string;  // ✅ NEW – FK tới Inventory_Docment.id
}

export type Type = "IN" | "OUT";

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
