import { Purchase_Orders, Purchase_Order_Items, Product } from "@/types/storage";
import {
  MOCK_PURCHASE_ORDERS,
  MOCK_PURCHASE_ORDER_ITEMS,
} from "./mock.purchase_orders";
import { MOCK_PRODUCTS } from "../product";

export function getAllRequests(): Purchase_Orders[] {
  return MOCK_PURCHASE_ORDERS;
}

export function getRequestById(id: string): Purchase_Orders | null {
  return MOCK_PURCHASE_ORDERS.find((x) => x.id === id) ?? null;
}

export function getRequestItems(orderId: string): Purchase_Order_Items[] {
  return MOCK_PURCHASE_ORDER_ITEMS.filter((x) => x.orderId === orderId);
}

// export function getRequestTimeline(orderId: string): Inventory_Docment[] {
//   return MOCK_PO_TIMELINE_BY_ORDER_ID[orderId] ?? [];
// }

export function findProductById(productId: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === productId);
}
