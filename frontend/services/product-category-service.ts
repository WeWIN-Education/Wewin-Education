import axiosClient from "@/lib/auth/axios";
import {
  CategoryFormPayload,
  CategorySearchParams,
} from "@/types/product-category";
import { Category } from "@/types/storage";

/* ================= SERVICE ================= */
export const categoryService = {
  /* ---------- SEARCH / LIST ---------- */
  async searchCategories(params: CategorySearchParams) {
    const res = await axiosClient.get("/categories", { params });
    return res.data.data as {
      items: Category[];
      pagination: {
        page: number;
        limit: number;
        total: number;
      };
    };
  },

  /* ---------- DETAIL ---------- */
  async getCategoryById(id: string) {
    const res = await axiosClient.get(`/categories/${id}`);
    return res.data.data as Category;
  },

  /* ---------- CREATE ---------- */
  async createCategory(data: CategoryFormPayload) {
    return axiosClient.post("/categories", data);
  },

  /* ---------- UPDATE ---------- */
  async updateCategory(id: string, data: CategoryFormPayload) {
    return axiosClient.put(`/categories/${id}`, data);
  },

  /* ---------- DELETE ---------- */
  async deleteCategory(id: string) {
    return axiosClient.delete(`/categories/${id}/delete`);
  },
};
