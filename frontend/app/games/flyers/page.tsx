"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectsFromFlyerBook } from "@/app/constants/flyerBookConfig";

export default function FlyersGamesPage() {
  const router = useRouter();

  useEffect(() => {
    const projects = getProjectsFromFlyerBook();
    if (!projects.length) return;
    router.replace(`/games/flyers/${projects[0].id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-600 font-semibold">
      <div className="text-center">
        <div className="text-4xl mb-4">🎮</div>
        <div>Đang mở Flyers Games...</div>
      </div>
    </div>
  );
}

