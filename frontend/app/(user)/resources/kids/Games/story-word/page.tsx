"use client";

import { useState, useEffect } from "react";
import { UnitGameScreen } from "@/app/components/games/UnitGameScreen";
import { getUnitBySlug } from "@/lib/constants/bookConfig";

// Helper function để load playerId từ localStorage (chỉ trong cùng 1 phiên tab)
function getSavedPlayerId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("kids_book_player_id") || "";
}

export default function StoryWordsGamePage() {
  const unit = getUnitBySlug("story-words");

  // playerId === null nghĩa là chưa load từ localStorage xong
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [showIdModal, setShowIdModal] = useState(false);

  const RELOAD_FLAG_KEY = "kids_book_was_reloaded";

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

    const SESSION_FLAG_KEY = "kids_book_session_started";

    // Nếu trước đó có reload (F5) → clear ID + progress
    const wasReload = sessionStorage.getItem(RELOAD_FLAG_KEY) === "1";
    if (wasReload) {
      localStorage.removeItem("kids_book_player_id");

      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("unit_") && key.endsWith("_progress")) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Clear flag reload cho lần sau
      sessionStorage.removeItem(RELOAD_FLAG_KEY);
      // Bắt nhập lại ID nên không đọc savedPlayerId ở đây
      setPlayerId("");
      setShowIdModal(true);
      return;
    }

    // Lần đầu vào Kids Games trong tab này → đánh dấu đã khởi tạo session
    if (!sessionStorage.getItem(SESSION_FLAG_KEY)) {
      sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    }

    // Đọc ID đã lưu (nếu có)
    const savedPlayerId = getSavedPlayerId();
    if (savedPlayerId) {
      setPlayerId(savedPlayerId);
      setShowIdModal(false);
    } else {
      setPlayerId("");
      setShowIdModal(true);
    }
  }, []);

  const handlePlayerIdSubmit = (id: string) => {
    setPlayerId(id);
    localStorage.setItem("kids_book_player_id", id);
    setShowIdModal(false);
  };

  const handlePlayerIdSkip = () => {
    setPlayerId("anonymous");
    localStorage.setItem("kids_book_player_id", "anonymous");
    setShowIdModal(false);
  };

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Unit không tìm thấy</h1>
          <p className="text-gray-500">Slug: story-words</p>
        </div>
      </div>
    );
  }

  if (playerId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-rose-100 text-pink-600 font-semibold">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <UnitGameScreen
      unit={unit}
      heading="📖 Story Words Adventure"
      subheading={unit.name}
      showBreadcrumb={true}
      breadcrumbBackUrl="/resources/kids/Games"
      breadcrumbBackLabel="Kids Book"
      initialPlayerId={playerId || ""}
      showIdModal={showIdModal}
      onPlayerIdSubmit={handlePlayerIdSubmit}
      onPlayerIdSkip={handlePlayerIdSkip}
    />
  );
}


