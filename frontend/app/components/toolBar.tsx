"use client";

import React from "react";
import Button from "@/app/components/button";
import SearchInput from "@/app/components/search";
import { LucideIcon } from "lucide-react";

interface PageToolbarProps {
  title: string;
  subtitle?: string | React.ReactNode;
  addLabel?: string;
  onAdd?: () => void;
  addIcon?: LucideIcon;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  rightFilters?: React.ReactNode;
}

/* ===============================
   LABEL SLOT (GIỐNG FILTER BAR)
================================ */
function ToolbarItem({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-w-65">
      {/* LABEL SLOT – LUÔN CÓ CHIỀU CAO */}
      <div className="h-5 mb-1 flex items-end">
        {label && (
          <span className="text-xs font-medium text-gray-600">{label}</span>
        )}
      </div>

      {children}
    </div>
  );
}

export default function PageToolbar({
  title,
  subtitle,
  addLabel,
  onAdd,
  addIcon: AddIcon,
  searchValue,
  onSearchChange,
  rightFilters,
}: PageToolbarProps) {
  return (
    <div>
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-xl lg:text-3xl md:text-2xl sm:text-xl font-bold text-[#0E4BA9] tracking-tight">
            {title}
          </div>

          {subtitle && (
            <div className="text-sm md:text-sm text-gray-500 leading-snug italic">
              {subtitle}
            </div>
          )}
        </div>

        {onAdd && addLabel && (
          <Button
            variant="gradient"
            leftIcon={AddIcon ? <AddIcon /> : undefined}
            onClick={onAdd}
          >
            {addLabel}
          </Button>
        )}
      </div>

      {/* ===== SEARCH + FILTER ROW ===== */}
      {(onSearchChange || rightFilters) && (
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
          {/* SEARCH (CÓ LABEL SLOT RỖNG) */}
          {onSearchChange && (
            <ToolbarItem>
              <SearchInput
                value={searchValue ?? ""}
                onChange={onSearchChange}
              />
            </ToolbarItem>
          )}

          {/* FILTERS */}
          {rightFilters && (
            <div className="flex items-end gap-3">{rightFilters}</div>
          )}
        </div>
      )}
    </div>
  );
}
