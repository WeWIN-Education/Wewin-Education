"use client";

import { ChevronDown, Search } from "lucide-react";
import { FilterConfig } from "@/types/filter";
import { MultiSelectDropdown } from "./storage/multiSelect";

/* ===============================
   TYPES
================================ */
interface DynamicFilterBarProps<T> {
  filters: readonly FilterConfig<T>[];
  values: T;
  onChange: <K extends keyof T>(key: K, value: T[K]) => void;
}

/* ===============================
   FILTER ITEM (FIX LỆCH HÀNG)
   - Luôn có "label slot" cao cố định
   - Search không có label vẫn không lệch
================================ */
function FilterItem({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-[180px]">
      {/* LABEL SLOT */}
      <div className="h-5 mb-1 flex items-end">
        {label && (
          <span className="text-xs font-medium text-gray-600">
            {label}
          </span>
        )}
      </div>

      {/* INPUT */}
      {children}
    </div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */
export default function DynamicFilterBar<T>({
  filters,
  values,
  onChange,
}: DynamicFilterBarProps<T>) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      {filters.map((filter) => {
        const key = filter.key;

        /* ===== SEARCH ===== */
        if (filter.type === "search") {
          return (
            <FilterItem key={String(key)} label={filter.label}>
              <div className="relative min-w-[260px]">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={String(values[key] ?? "")}
                  placeholder={filter.placeholder ?? "Tìm kiếm…"}
                  onChange={(e) =>
                    onChange(key, e.target.value as T[typeof key])
                  }
                  className="
                    h-11 w-full rounded-xl
                    bg-white
                    pl-9 pr-4
                    text-sm
                    border border-gray-200
                    shadow-sm
                    outline-none
                    transition
                    focus:border-[#0E4BA9]
                    focus:ring-2 focus:ring-[#0E4BA9]/20
                  "
                />
              </div>
            </FilterItem>
          );
        }

        /* ===== SELECT ===== */
        if (filter.type === "select") {
          return (
            <FilterItem key={String(key)} label={filter.label}>
              <div className="relative">
                <select
                  value={String(values[key])}
                  onChange={(e) =>
                    onChange(key, e.target.value as T[typeof key])
                  }
                  className="
                    h-11 w-full appearance-none
                    rounded-xl
                    bg-white
                    px-4 pr-9
                    text-sm
                    border border-gray-200
                    shadow-sm
                    outline-none
                    transition
                    hover:border-gray-300
                    focus:border-[#0E4BA9]
                    focus:ring-2 focus:ring-[#0E4BA9]/20
                  "
                >
                  {filter.options.map((opt) => (
                    <option
                      key={String(opt.value)}
                      value={String(opt.value)}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </FilterItem>
          );
        }

        /* ===== MULTI SELECT ===== */
        if (filter.type === "multiselect") {
          const current = (values[key] ?? []) as unknown as string[];

          return (
            <FilterItem key={String(key)} label={filter.label}>
              <MultiSelectDropdown
                value={current}
                options={filter.options.map((o) => ({
                  label: o.label,
                  value: String(o.value),
                }))}
                onChange={(v) =>
                  onChange(key, v as T[typeof key])
                }
                placeholder={filter.placeholder ?? "Chọn"}
              />
            </FilterItem>
          );
        }

        return null;
      })}
    </div>
  );
}
