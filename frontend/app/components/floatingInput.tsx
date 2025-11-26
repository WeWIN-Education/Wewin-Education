"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function FloatingInput({
  label,
  type,
  value,
  onChange,
  onKeyPress,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: any) => void;
  onKeyPress?: (e: any) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full">
      {/* BORDER */}
      <div
        className="
          absolute inset-0 rounded-xl border-2 
          transition-all duration-200
          pointer-events-none
          bg-transparent
          border-blue-300
          peer-focus-within:border-blue-600
        "
      />

      {/* LABEL */}
      <div
        className="
          absolute -top-2 left-4 px-1 
          bg-white 
          text-xs font-semibold 
          text-[#0E4BA9]
          peer-focus-within:text-blue-600
        "
      >
        {label}
      </div>

      {/* INPUT */}
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className="
          peer
          w-full px-5 py-3.5 
          pr-12
          rounded-xl 
          bg-white
          focus:outline-none 
          text-black
        "
      />

      {/* SHOW/HIDE PASSWORD */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="
            absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-500 hover:text-blue-600
          "
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={1.8} />
          ) : (
            <Eye size={20} strokeWidth={1.8} />
          )}
        </button>
      )}
    </div>
  );
}
