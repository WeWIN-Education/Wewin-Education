"use client";

import React from "react";

interface TextAreaProps {
  name: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  className?: string;
}

export default function TextArea({
  name,
  value,
  rows = 4,
  placeholder,
  onChange,
  onBlur,
  className = "",
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      value={value}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={[
        "w-full border border-blue-200 rounded-lg p-2.5",
        "focus:ring-2 focus:ring-[#0E4BA9] outline-none resize-none",
        className,
      ].join(" ")}
    />
  );
}