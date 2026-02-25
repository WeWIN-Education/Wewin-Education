"use client";

import React from "react";
import { cn } from "@/app/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "gradient";
}

export default function Button({
  children,
  onClick,
  leftIcon,
  rightIcon,
  className,
  disabled = false,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const base =
    // mobile: px-4 py-2, gap-1
    // md+: px-6 py-3, gap-2
    "inline-flex items-center justify-center rounded-xl font-semibold" +
    "transition-all active:scale-95 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed " +
    "px-3 py-2 gap-1 text-xs " + // mobile styles
    "md:gap-1 md:text-sm"; // tablet + desktop styles
    
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm",
    ghost: "text-slate-700 hover:bg-slate-200",
    gradient:
      "bg-gradient-to-r from-[#0E4BA9] to-[#00A6FB] text-white shadow-md hover:opacity-90",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
    >
      {leftIcon && (
        <span
          className="flex items-center justify-center
          [&>svg]:w-4 [&>svg]:h-4
          md:[&>svg]:w-5 md:[&>svg]:h-5"
        >
          {leftIcon}
        </span>
      )}

      {children}

      {rightIcon && (
        <span
          className="flex items-center justify-center
            [&>svg]:w-4 [&>svg]:h-4
            md:[&>svg]:w-5 md:[&>svg]:h-5"
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
