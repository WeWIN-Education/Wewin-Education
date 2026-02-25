"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useRef } from "react";

interface ImageInputProps {
  value?: string; // preview url (blob / remote)
  onChange: (file: File) => void;
}

export default function ImageInput({ value, onChange }: ImageInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={() => ref.current?.click()}
        className="relative w-full h-84 rounded-xl border border-dashed border-blue-300
                   flex items-center justify-center cursor-pointer
                   hover:bg-blue-50 transition overflow-hidden"
      >
        {value ? (
          <Image
            src={value}
            alt="preview"
            fill
            sizes="96px"
            className="object-contain rounded-xl bg-white"
            unoptimized={value.startsWith("blob:")}
          />
        ) : (
          <ImagePlus className="w-10 h-10 text-blue-400 " />
        )}
      </div>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </div>
  );
}
