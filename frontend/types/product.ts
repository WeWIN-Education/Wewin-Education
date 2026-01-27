import { StockStatus } from "./storage";

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number; // TỒN KHO HIỆN TẠI
  imageUrl?: string[];
  status: StockStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  inventoryDocumentId: string; // MẢNG CÁC PHIẾU NHẬP/XUẤT HÀNG LIÊN QUAN
  categoryId: string; // FK → Category.id
}

export interface ProductApi {
  id: string;
  code: string;
  name: string;
  unit: string;
  quantity: number;
  imageUrl?: string[];
  status: "in_stock" | "cancelled" | "out_of_stock";
  isActive: boolean;

  createAt: string; // ⚠ backend dùng createAt
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
