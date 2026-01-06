"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Package, Image as ImageIcon, X } from "lucide-react";

// ============= IMAGE CARD COMPONENT =============
interface ImageCardProps {
  imageUrl?: string;
  productName: string;
}

export function ProductImageCard({ imageUrl, productName }: ImageCardProps) {
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* ===== IMAGE CARD ===== */}
      <div className="group relative overflow-hidden bg-linear-to-br from-white to-orange-50/30 rounded-2xl p-6 shadow-lg border border-orange-100/50 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-200/20 to-transparent rounded-full blur-2xl" />

        <div className="relative flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
            <ImageIcon size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Hình ảnh vật dụng</h3>
        </div>

        <div
          className={`relative w-full aspect-4/3 rounded-xl overflow-hidden 
            bg-linear-to-br from-gray-50 to-gray-100 
            border border-gray-200 shadow-inner 
            group-hover:shadow-lg transition-all duration-300
            ${imageUrl ? "cursor-zoom-in" : ""}`}
          onClick={() => imageUrl && setOpen(true)}
        >
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-full blur-xl opacity-20 animate-pulse" />
                <Package
                  size={56}
                  className="relative text-gray-300 mb-3"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-sm font-medium text-gray-400">
                Chưa có hình ảnh
              </span>
            </div>
          )}
        </div>
      </div>

      {open && imageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)} // ✅ click đâu cũng đóng
        >
          {/* FRAME */}
          <div className="w-full h-full flex items-center justify-center p-6">
            {/* IMAGE BOX */}
            <div
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()} // ❌ chặn click ảnh
            >
              <NextImage
                src={imageUrl}
                alt={productName}
                width={1600}
                height={900}
                className="max-w-[95vw] max-h-[95vh] object-contain"
                priority
              />

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full
                     bg-black/70 hover:bg-black
                     flex items-center justify-center
                     text-white shadow-xl
                     cursor-pointer"
                aria-label="Đóng"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
