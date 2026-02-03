import axiosClient from "@/lib/auth/axios";

/* ================= TYPES ================= */

export interface StorageSearchParams {
  page?: number;
  limit?: number;
  q?: string; // backend đang dùng q thay vì search
  status?: "in_stock" | "out_of_stock" | "cancelled";
  categoryId?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface InventoryFormPayload {
  id?: string;
  code: string;
  name: string;
  categoryId: string;
  unit: string;
  quantity: number;
  imageUrl?: string[];
}

/* ================= SERVICE ================= */

export const storageService = {
  /* ---------- SEARCH ---------- */
  async searchProducts(params: StorageSearchParams) {
    const res = await axiosClient.get("/product", { params });
    return res.data.data;
  },

  /* ---------- DETAIL ---------- */
  getProductById(id: string, includeCancelled = false) {
    return axiosClient.get(`/product/${id}`, {
      params: { includeCancelled },
    });
  },

  /* ---------- HISTORY ---------- */
  getInventoryHistory(productId: string) {
    return axiosClient.get("/product/history", {
      params: { productId },
    });
  },

  /* ---------- CREATE ---------- */
  createProduct(data: InventoryFormPayload) {
    return axiosClient.post("/product", data);
  },

  /* ---------- UPDATE ---------- */
  updateProduct(id: string, data: InventoryFormPayload) {
    return axiosClient.patch(`/product/${id}`, data);
  },

  /* ---------- DISABLE ---------- */
  disableProduct(id: string) {
    return axiosClient.patch(`/product/${id}/disable`);
  },
};
