import { Inventory_Docment } from "@/types/storage";
import { MOCK_USERS } from "../userMock";

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
    createdBy: MOCK_USERS[1],
  },
];