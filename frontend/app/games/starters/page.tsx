"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProjectsFromStarterBook } from "@/app/constants/starterBookConfig";

export default function StartersGamesPage() {
  const router = useRouter();
  
  useEffect(() => {
    const projects = getProjectsFromStarterBook();
    if (!projects.length) return;
    router.replace(`/games/starters/${projects[0].id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 text-cyan-600 font-semibold">
      <div className="text-center">
        <div className="text-4xl mb-4">🎮</div>
        <div>Đang mở Starters Games...</div>
      </div>
    </div>
  );
}

