"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export function OrderAttachments({
  images,
}: {
  images: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="mt-6">
        <h4 className="font-semibold mb-3">
          Ảnh chứng từ / biên lai
        </h4>

        <div className="flex flex-wrap gap-3">
          {images.map((img) => (
            <Image
              key={img}
              src={img}
              alt="Biên lai"
              width={120}
              height={120}
              className="
                rounded-lg border
                object-cover cursor-zoom-in
                hover:scale-105 transition
              "
              onClick={() => setActive(img)}
            />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80
                     flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt="Biên lai"
              width={1600}
              height={1200}
              className="max-w-[95vw] max-h-[95vh] object-contain"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4
                         w-10 h-10 rounded-full
                         bg-black/70 text-white
                         flex items-center justify-center"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
