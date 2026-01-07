import {
  Purchase_Orders,
  Purchase_Order_Items,
  Inventory_Docment,
} from "@/types/storage";
import { MOCK_USERS } from "../../userMock";
import { MOCK_PRODUCTS } from "../product";

// NOTE: Product mock dùng để join hiển thị & check tồn kho khi duyệt OUT
// (đổi theo path thật của bạn)

export const MOCK_PURCHASE_ORDERS: Purchase_Orders[] = [
  {
    id: "po-001",
    code: "PO-001",
    name: "Phiếu nháp xuất kho văn phòng phẩm",
    note: "Chưa gửi duyệt",
    status: "SUCCESS",
    type: "OUT",
    createdBy: MOCK_USERS[0],
    createdAt: "2026-01-01T09:00:00.000Z",
    updatedAt: "2026-01-01T09:00:00.000Z",
  },
  {
    id: "po-002",
    code: "PO-002",
    name: "Yêu cầu xuất kho văn phòng phẩm",
    note: "Phục vụ lớp Flyers",
    status: "REQUESTED",
    type: "OUT",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-02T08:30:00.000Z",
    updatedAt: "2026-01-02T08:30:00.000Z",
  },
  {
    id: "po-008",
    code: "PO-008",
    name: "Yêu cầu xuất kho văn phòng phẩm",
    note: "Phục vụ lớp Flyers",
    status: "REQUESTED",
    type: "IN",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-02T08:30:00.000Z",
    updatedAt: "2026-01-02T08:30:00.000Z",
  },
  {
    id: "po-003",
    code: "PO-003",
    name: "Yêu cầu nhập kho đầu tháng",
    note: "Bổ sung tồn kho",
    status: "APPROVED",
    type: "IN",
    createdBy: MOCK_USERS[0],
    createdAt: "2026-01-03T10:20:00.000Z",
    updatedAt: "2026-01-03T11:05:00.000Z",
  },
  {
    id: "po-004",
    code: "PO-004",
    name: "Yêu cầu đặt mua thiết bị lớp học",
    note: "Mua thêm bảng viết và bút",
    status: "ORDER_REQUEST",
    type: "OUT",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-04T14:00:00.000Z",
    updatedAt: "2026-01-04T14:30:00.000Z",
  },
  {
    id: "po-005",
    code: "PO-005",
    name: "Đơn đặt hàng thiết bị lớp học",
    note: "Đã xác nhận nhà cung cấp",
    status: "ORDER_APPROVED",
    type: "OUT",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-05T09:15:00.000Z",
    updatedAt: "2026-01-05T10:00:00.000Z",
  },
  {
    id: "po-006",
    code: "PO-006",
    name: "Yêu cầu xuất kho thiết bị lớp học",
    note: "Thiếu thông tin lớp sử dụng",
    status: "CANCELLED",
    type: "OUT",
    createdBy: MOCK_USERS[1],
    createdAt: "2026-01-06T14:00:00.000Z",
    updatedAt: "2026-01-06T15:10:00.000Z",
  },
  {
    id: "po-007",
    code: "PO-007",
    name: "Hoàn tất nhập kho thiết bị mới",
    note: "Đã nhập kho và bàn giao",
    status: "SUCCESS",
    type: "IN",
    createdBy: MOCK_USERS[0],
    createdAt: "2026-01-07T08:00:00.000Z",
    updatedAt: "2026-01-07T16:45:00.000Z",
  },
];

export const MOCK_PURCHASE_ORDER_ITEMS: Purchase_Order_Items[] = [
  /* =================================================
     PO-001 – ĐÃ ĐẶT HÀNG (GIÁ + SỐ LƯỢNG ĐỀU THAY ĐỔI)
     ================================================= */

  {
    orderId: "po-001",
    productId: MOCK_PRODUCTS[0].id, // VT-001 – Bút lông bảng

    /* ===== REQUEST ===== */
    quantityRequest: 10,
    unitPriceRequest: 15000,
    vatPriceRequest: 15000 * 10 * 0.1,
    totalPriceRequest: 15000 * 10 * 1.1,
    noteRequest: "Đề xuất theo báo giá tháng trước",

    /* ===== ORDER ===== */
    quantityOrdered: 12, // 🔺 đặt dư do MOQ nhà cung cấp
    unitPriceOrdered: 16500,
    vatPriceOrdered: 16500 * 12 * 0.1,
    totalPriceOrdered: 16500 * 12 * 1.1,
    noteOrdered: "Nhà cung cấp bán theo hộp 12 cây",
  },

  {
    orderId: "po-001",
    productId: MOCK_PRODUCTS[1].id, // VT-002 – Giấy A4

    /* ===== REQUEST ===== */
    quantityRequest: 12,
    unitPriceRequest: 55000,
    vatPriceRequest: 55000 * 12 * 0.08,
    totalPriceRequest: 55000 * 12 * 1.08,
    noteRequest: "Dự kiến dùng cho in tài liệu học tập",

    /* ===== ORDER ===== */
    quantityOrdered: 10, // 🔻 nhà cung cấp thiếu hàng
    unitPriceOrdered: 52000,
    vatPriceOrdered: 52000 * 10 * 0.08,
    totalPriceOrdered: 52000 * 10 * 1.08,
    noteOrdered: "Nhà cung cấp chỉ còn 10 ram trong kho",
  },

  /* =================================================
     PO-002 – CHỈ REQUEST (CHƯA ĐẶT)
     ================================================= */

  {
    orderId: "po-002",
    productId: MOCK_PRODUCTS[2].id, // VT-003 – Khăn lau bảng

    /* ===== REQUEST ===== */
    quantityRequest: 20,
    unitPriceRequest: 12000,
    vatPriceRequest: 12000 * 20 * 0.1,
    totalPriceRequest: 12000 * 20 * 1.1,
    noteRequest: "Dự kiến mua bổ sung đầu tháng",

    /* ===== ORDER ===== */
    // ❌ Chưa đặt → KHÔNG có quantityOrdered / priceOrdered
  },
];

export const MOCK_PO_TIMELINE_BY_ORDER_ID: Record<string, Inventory_Docment[]> =
  {
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
