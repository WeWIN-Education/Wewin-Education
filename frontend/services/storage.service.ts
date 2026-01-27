import axiosClient from "@/lib/axios";

export interface StorageSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: "in_stock" | "out_of_stock" | "cancelled";
  categoryId?: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export async function searchProducts(params: unknown) {
  const res = await axiosClient.get("/product", { params });
  return res.data.data;
}

export const storageService = {
  searchProducts(params: unknown) {
    return axiosClient.get("/product", { params }).then((res) => res.data.data);
  },
  getProductById(id: string) {
    return axiosClient.get(`/product/${id}`);
  },

  getInventoryHistory(productId: string) {
    return axiosClient.get(`/product`, {
      params: { productId },
    });
  },
};
