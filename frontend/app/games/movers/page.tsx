"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProjectsFromMoverBook } from "@/lib/constants/moverBookConfig";

export default function MoversGamesPage() {
  const router = useRouter();
  
  useEffect(() => {
    const projects = getProjectsFromMoverBook();
    if (!projects.length) return;
    router.replace(`/games/movers/${projects[0].id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-600 font-semibold">
      <div className="text-center">
        <div className="text-4xl mb-4">🎮</div>
        <div>Đang mở Movers Games...</div>
      </div>
    </div>
  );
}

