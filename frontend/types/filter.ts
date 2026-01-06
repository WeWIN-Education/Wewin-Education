export type FilterType = "search" | "select" | "multiselect";

export interface BaseFilterConfig<T, K extends keyof T> {
  key: K;
  type: FilterType;
}

/* ===== SEARCH ===== */
export interface SearchFilterConfig<T, K extends keyof T>
  extends BaseFilterConfig<T, K> {
  type: "search";
  label?: string;
  placeholder?: string;
}

interface LabeledFilterConfig<T, K extends keyof T>
  extends BaseFilterConfig<T, K> {
  label: string;
}

/* ===== OPTION ===== */
export interface SelectOption<V> {
  label: string;
  value: V;
}

/* ===== SELECT (single) ===== */
export interface SelectFilterConfig<T, K extends keyof T>
  extends LabeledFilterConfig<T, K> {
  type: "select";
  options: readonly SelectOption<T[K]>[];
}

/* ===== MULTI SELECT ===== */
export interface MultiSelectFilterConfig<T, K extends keyof T>
  extends LabeledFilterConfig<T, K> {
  type: "multiselect";
  options: readonly SelectOption<
    T[K] extends readonly (infer U)[] ? U : never
  >[];
  placeholder?: string;
}

/* ===== 🚀 FINAL: MAP THE UNION BY KEY ===== */
export type FilterConfigFor<T> = {
  [K in keyof T]:
    | SearchFilterConfig<T, K>
    | SelectFilterConfig<T, K>
    | (T[K] extends readonly unknown[]
        ? MultiSelectFilterConfig<T, K>
        : never);
}[keyof T];
/* ===== HELPER ===== */
export function defineFilters<T>() {
  return <F extends readonly FilterConfigFor<T>[]>(filters: F) => filters;
}

export type FilterConfig<T> = FilterConfigFor<T>;
