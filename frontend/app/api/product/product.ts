import { create } from "zustand";
import {
  searchProducts,
  StorageSearchParams,
} from "@/services/storage.service";
import { Product } from "@/types/product";
import { mapProductApiToDomain } from "@/app/mappers/product.mapper";


interface StorageState {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
  query: StorageSearchParams;
  fetchProducts: (params?: StorageSearchParams) => Promise<void>;
  setQuery: (params: Partial<StorageSearchParams>) => void;
  reset: () => void;
}

export const useStorageStore = create<StorageState>((set, get) => ({
  products: [],
  pagination: null,
  loading: false,
  error: null,

  query: {
    page: 1,
    limit: 10,
  },

  setQuery: (params) =>
    set((state) => ({
      query: { ...state.query, ...params },
    })),

  reset: () =>
    set({
      products: [],
      pagination: null,
      loading: false,
      error: null,
      query: { page: 1, limit: 10 },
    }),

  fetchProducts: async (params) => {
    set({ loading: true, error: null });

    const finalQuery = {
      ...get().query,
      ...params,
    };

    try {
      const data = await searchProducts(finalQuery);

      set({
        products: data.items.map(mapProductApiToDomain),
        pagination: {
          page: Number(data.pagination.page),
          limit: Number(data.pagination.limit),
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        },
        query: finalQuery,
        loading: false,
      });
    } catch (err: unknown) {
      let message = "Fetch storage products failed";

      if (err instanceof Error) {
        message = err.message;
      }

      set({
        loading: false,
        error: message,
      });
    }
  },
}));
