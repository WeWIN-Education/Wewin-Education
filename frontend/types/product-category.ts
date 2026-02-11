/* ================= TYPES ================= */
export interface CategorySearchParams {
  page?: number;
  limit?: number;
  q?: string; // search theo code hoac ten
  sortBy?: string;
  order?: "ASC" | "DESC";
  name?: string;
}

export interface CategoryFormPayload {
  name: string;
  description?: string;
}
