"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectsFromBook } from "@/lib/constants/bookConfig";

/**
 * PUBLIC: Trang entry cho Kids Games
 * Redirect đến project đầu tiên
 */
export default function KidsGamesPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Xoá ID người chơi
      localStorage.removeItem("kids_book_player_id");

      // Xoá toàn bộ progress của các unit
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("unit_") && key.endsWith("_progress")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Reset các flag phiên
      sessionStorage.removeItem("kids_book_session_started");
      sessionStorage.removeItem("kids_book_reload_cleared");
    }

    const projectsForSidebar = getProjectsFromBook();
    if (!projectsForSidebar.length) return;

    const firstProject = projectsForSidebar[0];
    // Redirect đến route PUBLIC mới
    router.replace(`/games/kids/${firstProject.id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-rose-100 text-pink-600 font-semibold">
      <div className="text-center">
        <div className="text-4xl mb-4">🎮</div>
        <div>Đang mở Kids Games...</div>
      </div>
    </div>
  );
}

