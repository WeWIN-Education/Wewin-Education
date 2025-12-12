"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { UnitGameScreen } from "@/app/components/games/UnitGameScreen";
import { FlyerUnitsSidebar } from "@/app/components/games/FlyerUnitsSidebar";
import { getFlyerUnitBySlug, getProjectsFromFlyerBook, getFlyerUnitIndex } from "@/app/constants/flyerBookConfig";

// Helper: lấy ID từ localStorage (chỉ dùng trong cùng 1 phiên tab)
function getSavedPlayerId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("flyer_book_player_id") || "";
}

export default function FlyerGamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const unit = getFlyerUnitBySlug(slug);
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

  const RELOAD_FLAG_KEY = "flyer_book_was_reloaded";

  // Đánh dấu khi tab chuẩn bị reload/đóng
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeUnload = () => {
      sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Đọc localStorage sau khi mount
  // - Nếu trước đó có reload (F5) → xoá ID + progress, bắt nhập lại
  // - Nếu chỉ navigate trong cùng tab → giữ ID + progress
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SESSION_FLAG_KEY = "flyer_book_session_started";

    // Nếu trước đó có reload (F5) → clear ID + progress và quay về Project đầu tiên
    const wasReload = sessionStorage.getItem(RELOAD_FLAG_KEY) === "1";
    if (wasReload) {
      localStorage.removeItem("flyer_book_player_id");

      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("flyer_book_unit_") && key.endsWith("_progress")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Clear flag reload cho lần sau
      sessionStorage.removeItem(RELOAD_FLAG_KEY);

      // Lấy project đầu tiên và chuyển hướng về đó
      const projects = getProjectsFromFlyerBook();
      if (projects.length > 0) {
        const first = projects[0];
        router.replace(`/resources/flyer/Games/${first.id}`);
      } else {
        // Nếu không có project nào, quay về trang tổng Flyer Book
        router.replace("/resources/flyer/Games");
      }

      return;
    }

    // Lần đầu vào Flyer Games trong tab này → đánh dấu đã khởi tạo session
    if (!sessionStorage.getItem(SESSION_FLAG_KEY)) {
      sessionStorage.setItem(SESSION_FLAG_KEY, "1");
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
  }, []);

  const handlePlayerIdSubmit = (id: string) => {
    setPlayerId(id);
    localStorage.setItem("flyer_book_player_id", id);
    setShowIdModal(false);
  };

  const handlePlayerIdSkip = () => {
    setPlayerId("anonymous");
    localStorage.setItem("flyer_book_player_id", "anonymous");
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
    <div className="min-h-screen md:flex md:items-stretch bg-gradient-to-b from-blue-50 via-blue-50 to-blue-100 bg-fixed">
      {/* Hamburger button cho mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-60 left-4 z-30 md:hidden w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors"
        aria-label="Mở menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <FlyerUnitsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 md:ml-0 md:min-h-screen">
        <UnitGameScreen
          unit={unit}
          heading={unit.name}
          subheading={unit.bookname}
          showBreadcrumb={true}
          breadcrumbBackUrl="/resources/flyer/Games"
          breadcrumbBackLabel="Flyer Book"
          initialPlayerId={playerId || ""}
          showIdModal={showIdModal}
          onPlayerIdSubmit={handlePlayerIdSubmit}
          onPlayerIdSkip={handlePlayerIdSkip}
          unitIndex={getFlyerUnitIndex(slug)}
        />
      </div>
    </div>
  );
}

