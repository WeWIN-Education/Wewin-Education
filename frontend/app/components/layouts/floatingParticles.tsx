"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Chỉ chạy random khi client đã mount → tránh mismatch
    setMounted(true);
  }, []);

  if (!mounted) return null; // SSR = rỗng → hydrate an toàn

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: Math.random() * -100 - 20 + "%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 1.5,
            ease: "easeOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
