"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectsFromBook } from "@/app/constants/bookConfig";

/**
 * Khi vào lần đầu `/resources/kids/Games`:
 * - Tự động chuyển sang project đầu tiên (ví dụ: MY FUTURE CAREER FAIR)
 * - Tại trang đó mới hiện popup nhập ID (nếu chưa có)
 *
 * Navigation sau đó giữa các project sẽ dùng lại ID đã nhập.
 */
export default function KidsBookGamesPage() {
  const router = useRouter();

  // Khi vào trang root Kids Book:
  // - Xoá ID + progress cũ để bắt đầu phiên mới
  // - Sau đó tự động điều hướng sang project đầu tiên
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Xoá ID người chơi
      localStorage.removeItem("kids_book_player_id");

      // Xoá toàn bộ progress của các unit (unit_*_progress)
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("unit_") && key.endsWith("_progress")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Reset các flag phiên nếu có
      sessionStorage.removeItem("kids_book_session_started");
      sessionStorage.removeItem("kids_book_reload_cleared");
    }

    const projectsForSidebar = getProjectsFromBook();
    if (!projectsForSidebar.length) return;

    const firstProject = projectsForSidebar[0];
    router.replace(`/resources/kids/Games/${firstProject.id}`);
  }, [router]);

  // Có thể hiển thị màn hình loading ngắn trong lúc redirect
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 text-pink-600 font-semibold">
      Đang mở Kids Book...
    </div>
  );
}

