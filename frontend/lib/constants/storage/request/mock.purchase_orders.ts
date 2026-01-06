import { Purchase_Orders, Purchase_Order_Items, Inventory_Docment } from "@/types/storage";
import { MOCK_USERS } from "../../userMock";
import { MOCK_PRODUCTS } from "../product";

// NOTE: Product mock dùng để join hiển thị & check tồn kho khi duyệt OUT
// (đổi theo path thật của bạn)

export const MOCK_PURCHASE_ORDERS: Purchase_Orders[] = [
  {
    id: "po-001",
    code: "PO-001",
    name: "Yêu cầu xuất kho văn phòng phẩm",
    note: "Phục vụ lớp Flyers",
    status: "PENDING",
    type: "OUT",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-05T08:30:00.000Z",
    updatedAt: "2026-01-05T08:30:00.000Z",
  },
  {
    id: "po-002",
    code: "PO-002",
    name: "Yêu cầu nhập kho đầu tháng",
    note: "Bổ sung tồn kho",
    status: "APPROVED",
    type: "IN",
    createdBy: MOCK_USERS[0],
    createdAt: "2026-01-04T10:20:00.000Z",
    updatedAt: "2026-01-04T11:05:00.000Z",
  },
  {
    id: "po-003",
    code: "PO-003",
    name: "Yêu cầu xuất kho thiết bị lớp học",
    note: "Thiếu thông tin lớp sử dụng",
    status: "REJECTED",
    type: "OUT",
    createdBy: MOCK_USERS[2],
    createdAt: "2026-01-03T14:00:00.000Z",
    updatedAt: "2026-01-03T15:10:00.000Z",
  },
];

export const MOCK_PURCHASE_ORDER_ITEMS: Purchase_Order_Items[] = [
  {
    orderId: "po-001",
    productId: MOCK_PRODUCTS[0].id, // "VT-001"
    quantityRequest: 10,
    unitPriceRequest: 15000,
    vatPriceRequest: 0,
    totalPriceRequest: 150000,
    noteRequest: "Bút lông bảng cho lớp Flyers",
  },
  {
    orderId: "po-001",
    productId: MOCK_PRODUCTS[1].id, // "VT-002"
    quantityRequest: 12,
    unitPriceRequest: 55000,
    vatPriceRequest: 0,
    totalPriceRequest: 660000,
    noteRequest: "Giấy A4 dùng cho in bài tập",
  },

  {
    orderId: "po-002",
    productId: MOCK_PRODUCTS[2].id, // "VT-003"
    quantityRequest: 20,
    unitPriceRequest: 12000,
    vatPriceRequest: 0,
    totalPriceRequest: 240000,
    noteRequest: "Nhập khăn lau bảng",
  },
];

export const MOCK_PO_TIMELINE_BY_ORDER_ID: Record<string, Inventory_Docment[]> = {
  "po-001": [
    {
      id: "INV-TL-001",
      note: "Người dùng tạo yêu cầu",
      createdAt: "2026-01-05T08:30:00.000Z",
      updatedAt: "2026-01-05T08:30:00.000Z",
      createdBy: MOCK_USERS[1],
    },
    {
      id: "INV-TL-002",
      note: "Kho đã xem và yêu cầu bổ sung thông tin",
      createdAt: "2026-01-05T09:10:00.000Z",
      updatedAt: "2026-01-05T09:10:00.000Z",
      createdBy: MOCK_USERS[0],
    },
  ],
  "po-002": [
    {
      id: "INV-TL-003",
      note: "Người dùng tạo yêu cầu",
      createdAt: "2026-01-04T10:20:00.000Z",
      updatedAt: "2026-01-04T10:20:00.000Z",
      createdBy: MOCK_USERS[0],
    },
    {
      id: "INV-TL-004",
      note: "Quản lý kho duyệt yêu cầu",
      createdAt: "2026-01-04T11:05:00.000Z",
      updatedAt: "2026-01-04T11:05:00.000Z",
      createdBy: MOCK_USERS[0],
    },
  ],
  "po-003": [
    {
      id: "INV-TL-005",
      note: "Người dùng tạo yêu cầu",
      createdAt: "2026-01-03T14:00:00.000Z",
      updatedAt: "2026-01-03T14:00:00.000Z",
      createdBy: MOCK_USERS[2],
    },
    {
      id: "INV-TL-006",
      note: "Từ chối: Thiếu thông tin lớp và thời gian sử dụng",
      createdAt: "2026-01-03T15:10:00.000Z",
      updatedAt: "2026-01-03T15:10:00.000Z",
      createdBy: MOCK_USERS[0],
    },
  ],
};
