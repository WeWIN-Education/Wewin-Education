"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string[];
  options: Option[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}

export function MultiSelectDropdown({
  value,
  options,
  onChange,
  placeholder = "Chọn...",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* ===== CLICK OUTSIDE TO CLOSE ===== */
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div ref={ref} className="relative">
      {/* ===== Trigger ===== */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          h-11 w-full min-w-[220px]
          rounded-xl bg-white px-4
          flex items-center justify-between
          text-sm border border-gray-200 shadow-sm
          hover:border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-[#0E4BA9]/20
        "
      >
        <span className="truncate text-left">
          {value.length ? `Đã chọn ${value.length}` : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ===== Dropdown ===== */}
      {open && (
        <div
          className="
      absolute z-30 mt-2 w-full
      bg-white rounded-2xl
      border border-gray-200
      shadow-xl
      max-h-64 overflow-auto
      py-1
    "
        >
          {options.map((opt) => {
            const checked = value.includes(opt.value);

            return (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={`
            group flex items-center gap-3
            px-4 py-2.5
            cursor-pointer text-sm
            transition
            ${checked ? "bg-[#0E4BA9]/5" : "hover:bg-gray-50"}
          `}
              >
                {/* Checkbox */}
                <div
                  className={`
              w-4 h-4 rounded-md
              border flex items-center justify-center
              transition
              ${
                checked
                  ? "bg-[#0E4BA9] border-[#0E4BA9]"
                  : "border-gray-300 group-hover:border-gray-400"
              }
            `}
                >
                  {checked && <Check size={12} className="text-white" />}
                </div>

                {/* Label */}
                <span
                  className={`
              flex-1
              ${checked ? "text-[#0E4BA9] font-medium" : "text-gray-700"}
            `}
                >
                  {opt.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
