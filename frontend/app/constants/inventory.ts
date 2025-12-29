import { Category, Product } from "@/types/inventory";

export const MOCK_CATEGORIES: Category[] = [
  { id: "c1", name: "Văn phòng", isActive: true },
  { id: "c2", name: "Thiết bị lớp học", isActive: true },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "VT-001",
    name: "Bút lông bảng",
    categoryId: "c1",
    quantity: 120,
    unit: "Cây",
    isActive: true,
  },
  {
    id: "VT-002",
    name: "Giấy A4",
    categoryId: "c1",
    quantity: 8,
    unit: "Ram",
    isActive: true,
  },
  {
    id: "VT-003",
    name: "Khăn lau bảng",
    categoryId: "c2",
    quantity: 0,
    unit: "Cái",
    isActive: true,
  },
];

// minQuantity không nằm trong ERD Product => mock cấu hình riêng (sau này tách table config nếu cần)
export const MIN_QTY_BY_PRODUCT_ID: Record<string, number> = {
  "1": 20,
  "2": 10,
  "3": 5,
};