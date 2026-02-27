"use client";

import React from "react";

interface SelectInputProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;

  placeholder?: string; // text hiển thị option đầu
  disabledPlaceholder?: boolean; // default true
  className?: string;
}

export default function SelectInput({
  name,
  value,
  options,
  onChange,
  onBlur,
  placeholder = "Chọn danh mục",
  disabledPlaceholder = true,
  className = "",
}: SelectInputProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={[
        "w-full border border-blue-200 rounded-lg p-2.5 bg-white",
        "focus:ring-2 focus:ring-[#0E4BA9] outline-none",
        className,
      ].join(" ")}
    >
      <option value="" disabled={disabledPlaceholder}>
        {placeholder}
      </option>

      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}