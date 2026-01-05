import {
  Category,
  Product,
  Inventory_Docment,
} from "@/types/storage";
import { MOCK_USERS } from "./userMock";


/* =======================
   MOCK CATEGORIES
======================= */
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "c1",
    name: "Văn phòng",
    isActive: true,
  },
  {
    id: "c2",
    name: "Thiết bị lớp học",
    isActive: true,
  },
];

/* =======================
   MOCK INVENTORY DOCUMENTS
======================= */
export const MOCK_INVENTORY_DOCUMENTS: Inventory_Docment[] = [
  {
    id: "INV-001",
    note: "Nhập kho đầu kỳ",
    createdAt: "2025-01-01T08:00:00.000Z",
    updatedAt: "2025-01-01T08:00:00.000Z",
    createdBy: MOCK_USERS[0],
  },
  {
    id: "INV-002",
    note: "Xuất kho cho lớp học",
    createdAt: "2025-01-03T09:30:00.000Z",
    updatedAt: "2025-01-03T09:30:00.000Z",
    createdBy: MOCK_USERS[0],
  },
];

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
    imageUrl: undefined,
    status: "ACTIVE",
    createdAt: "2025-01-01T08:00:00.000Z",
    updatedAt: "2025-01-05T10:30:00.000Z",
    inventoryDocmentsId: [MOCK_INVENTORY_DOCUMENTS[0]],
    categoryId: MOCK_CATEGORIES[0],
  },
  {
    id: "VT-002",
    code: "VT-002",
    name: "Giấy A4",
    unit: "Ram",
    quantity: 8,
    status: "ACTIVE",
    createdAt: "2025-01-02T09:00:00.000Z",
    updatedAt: "2025-01-05T10:30:00.000Z",
    inventoryDocmentsId: [
      MOCK_INVENTORY_DOCUMENTS[0],
      MOCK_INVENTORY_DOCUMENTS[1],
    ],
    categoryId: MOCK_CATEGORIES[0],
  },
  {
    id: "VT-003",
    code: "VT-003",
    name: "Khăn lau bảng",
    unit: "Cái",
    quantity: 0,
    status: "INACTIVE",
    createdAt: "2025-01-03T09:00:00.000Z",
    updatedAt: "2025-01-05T10:30:00.000Z",
    inventoryDocmentsId: [],
    categoryId: MOCK_CATEGORIES[1],
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
