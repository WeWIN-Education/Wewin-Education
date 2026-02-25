"use client";

import React from "react";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "email" | "password";
}

export default function TextInput({
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}: TextInputProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-blue-200 rounded-lg p-2.5
                 focus:ring-2 focus:ring-[#0E4BA9] outline-none"
    />
  );
}
