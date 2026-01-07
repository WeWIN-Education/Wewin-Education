"use client";

import { Search } from "lucide-react";
import { cn } from "@/app/utils/cn";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className
}: SearchInputProps) {
  return (
    <div className={cn("relative w-full md:w-96", className)}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-white border border-slate-300 rounded-lg
          py-2.5 pl-4 pr-12 text-sm
          placeholder:text-slate-400 text-slate-700
          focus:border-blue-400 focus:ring-2 focus:ring-blue-100
          transition-all outline-none
        "
      />

      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
        strokeWidth={2}
      />
    </div>
  );
}
