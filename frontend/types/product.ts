import { StockStatus } from "./storage";

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number; // TỒN KHO HIỆN TẠI
  description: string;
  imageUrl?: string | null; 
  status: StockStatus;
  createdAt: string; 
  updatedAt: string; 
  inventoryDocumentId: string; // MẢNG CÁC PHIẾU NHẬP/XUẤT HÀNG LIÊN QUAN
  categoryId: string; // FK → Category.id
}

export interface ProductApi {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  description: string;
  imageUrl?: string | null; 
  status: "in_stock" | "out_of_stock" | "low_stock" | "cancelled"; // ⚠ backend trả snake_case
  isActive: boolean;
  createAt: string;
  updateAt: string;
  categoryId: string;
  inventoryDocumentId: string;
}

export interface StorageSearchResponse {
  items: ProductApi[];
  pagination: {
    page: string; // ⚠ backend trả string
    limit: string; // ⚠ backend trả string
    total: number;
    totalPages: number;
  };
  filters: {
    q: string | null;
    status: string | null;
    categoryId: string | null;
    inventoryDocumentId: string | null;
    includeCancelled: boolean;
  };
}
