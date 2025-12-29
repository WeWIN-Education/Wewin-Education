"use client";

import React from "react";
import Button from "@/app/components/button";
import SearchInput from "@/app/components/search";
import { LucideIcon } from "lucide-react";

interface PageToolbarProps {
  title: string;

  /* ADD BUTTON */
  addLabel?: string;
  onAdd?: () => void;
  addIcon?: LucideIcon;

  /* SEARCH */
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  /* Optional LEFT slot */
  leftSlot?: React.ReactNode;
}

export default function PageToolbar({
  title,
  addLabel,
  onAdd,
  addIcon: AddIcon,
  searchValue,
  onSearchChange,
  leftSlot,
}: PageToolbarProps) {
  return (
    <div className="space-y-4">
      {/* ===== TOP ROW ===== */}
      <div className="flex items-center justify-between gap-4">
        {/* LEFT SIDE: TITLE + SLOT */}
        <div className="flex items-center gap-3">
          <div className="text-xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-[#0E4BA9] tracking-tight">
            {title}
          </div>
        </div>

        {/* RIGHT SIDE: MAIN ACTION */}
        <div className="flex items-center gap-2">
          {leftSlot}

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
      </div>

      {/* ===== SEARCH ===== */}
      {onSearchChange && (
        <SearchInput value={searchValue ?? ""} onChange={onSearchChange} />
      )}
    </div>
  );
}
