"use client";

import React from "react";

interface FormFieldProps {
  label?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  required,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-[#0E4BA9]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {children}

      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
