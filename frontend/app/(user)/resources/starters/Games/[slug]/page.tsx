"use client";

import { useState, useEffect } from "react";
import { UnitGameScreen } from "@/app/components/games/UnitGameScreen";
import { StarterUnitsSidebar } from "@/app/components/games/StarterUnitsSidebar";
import { getStarterUnitBySlug, getProjectsFromStarterBook, getStarterUnitIndex } from "@/app/constants/starterBookConfig";
import { useParams, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

// Helper: lấy ID từ localStorage (chỉ dùng trong cùng 1 phiên tab)
function getSavedPlayerId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("starter_book_player_id") || "";
}

export default function StarterGamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const unit = getStarterUnitBySlug(slug);
  const router = useRouter();

  // Load playerId ngay lập tức để tránh flash "Đang tải dữ liệu..."
  const [playerId, setPlayerId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return getSavedPlayerId() || "";
  });
  const [showIdModal, setShowIdModal] = useState(() => {
    if (typeof window === "undefined") return false;
    return !getSavedPlayerId();
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const RELOAD_FLAG_KEY = "starter_book_was_reloaded";

  // Đánh dấu khi tab chuẩn bị reload/đóng
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Xử lý reload (F5) - chỉ chạy một lần khi mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Nếu trước đó có reload (F5) → clear ID + progress và quay về Project đầu tiên
    const wasReload = sessionStorage.getItem(RELOAD_FLAG_KEY) === "1";
    if (wasReload) {
      localStorage.removeItem("starter_book_player_id");

      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("starter_book_unit_") && key.endsWith("_progress")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Clear flag reload cho lần sau
      sessionStorage.removeItem(RELOAD_FLAG_KEY);

      // Lấy project đầu tiên và chuyển hướng về đó
      const projects = getProjectsFromStarterBook();
      if (projects.length > 0) {
        const first = projects[0];
        router.replace(`/resources/starters/Games/${first.id}`);
      } else {
        // Nếu không có project nào, quay về trang tổng Starter Book
        router.replace("/resources/starters/Games");
      }

      // Set playerId để không bị stuck ở loading
      setPlayerId("");
      setShowIdModal(true);
      return;
    }

    // Đồng bộ playerId với localStorage
    const savedPlayerId = getSavedPlayerId();
    if (savedPlayerId) {
      // Có ID đã lưu → dùng ID đó, không hiện modal
      setPlayerId(savedPlayerId);
      setShowIdModal(false);
    } else {
      // Chưa có ID → hiện modal để nhập
      setPlayerId("");
      setShowIdModal(true);
    }
  }, []); // Chỉ chạy một lần khi mount

  // Đánh dấu session đã khởi tạo
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SESSION_FLAG_KEY = "starter_book_session_started";
    if (!sessionStorage.getItem(SESSION_FLAG_KEY)) {
      sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    }
  }, []);

  const handlePlayerIdSubmit = (id: string) => {
    setPlayerId(id);
    localStorage.setItem("starter_book_player_id", id);
    setShowIdModal(false);
  };

  const handlePlayerIdSkip = () => {
    setPlayerId("anonymous");
    localStorage.setItem("starter_book_player_id", "anonymous");
    setShowIdModal(false);
  };

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Project không tìm thấy
          </h1>
          <p className="text-gray-500">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  // Không cần check playerId === null nữa vì đã load ngay từ đầu

  return (
    <div className="min-h-screen md:flex md:items-stretch">
      {/* Hamburger button cho mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-60 left-4 z-30 md:hidden w-10 h-10 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-lg transition-colors"
        aria-label="Mở menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <StarterUnitsSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 md:ml-0">
        <UnitGameScreen
          unit={unit}
          heading={unit.name}
          subheading={unit.bookname}
          showBreadcrumb={true}
          breadcrumbBackUrl="/resources/starters/Games"
          breadcrumbBackLabel="Starter Book"
          initialPlayerId={playerId || ""}
          showIdModal={showIdModal}
          onPlayerIdSubmit={handlePlayerIdSubmit}
          onPlayerIdSkip={handlePlayerIdSkip}
          unitIndex={getStarterUnitIndex(slug)}
        />
      </div>
    </div>
  );
}

