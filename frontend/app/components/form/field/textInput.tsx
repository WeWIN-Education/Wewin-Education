"use client";

import React from "react";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;

  type?: "text" | "number" | "email" | "password";
  min?: number;
  max?: number;
  step?: number;

  className?: string;
}

export default function TextInput({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  type = "text",
  min,
  max,
  step,
  className = "",
}: TextInputProps) {
  // 🚫 chặn nhập số âm bằng keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number") {
      if (e.key === "-" || e.key === "e" || e.key === "E") {
        e.preventDefault();
      }
    }
  };

  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      min={type === "number" ? min : undefined}
      max={type === "number" ? max : undefined}
      step={type === "number" ? step : undefined}
      className={[
        "w-full border border-blue-200 rounded-lg p-2.5",
        "focus:ring-2 focus:ring-[#0E4BA9] outline-none",
        className,
      ].join(" ")}
    />
  );
}