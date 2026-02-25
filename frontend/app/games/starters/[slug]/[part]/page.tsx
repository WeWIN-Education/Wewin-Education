"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UnitGameScreen } from "@/app/components/games/UnitGameScreen";
import { StarterUnitsSidebar } from "@/app/components/games/StarterUnitsSidebar";
import { getStarterUnitBySlug, getProjectsFromStarterBook, getStarterUnitIndex } from "@/lib/constants/starterBookConfig";
import { Menu } from "lucide-react";

function getSavedPlayerId(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("starter_book_player_id") || "";
}

export default function StartersGamePartPage() {
  const params = useParams();
  const slug = params.slug as string;
  const unit = getStarterUnitBySlug(slug);
  const router = useRouter();

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleBeforeUnload = () => sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
      sessionStorage.removeItem(RELOAD_FLAG_KEY);
      const projects = getProjectsFromStarterBook();
      if (projects.length > 0) router.replace(`/games/starters/${projects[0].id}`);
      else router.replace("/games/starters");
      setPlayerId("");
      setShowIdModal(true);
      return;
    }
    const saved = getSavedPlayerId();
    if (saved) {
      setPlayerId(saved);
      setShowIdModal(false);
    } else {
      setPlayerId("");
      setShowIdModal(true);
    }
  }, [router]);

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
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Project không tìm thấy</h1>
          <p className="text-gray-500">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:flex md:items-stretch">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-60 left-4 z-30 md:hidden w-10 h-10 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-lg transition-colors"
        aria-label="Mở menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <StarterUnitsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} basePath="/games/starters" />

      <div className="flex-1 md:ml-0 md:min-h-screen">
        <UnitGameScreen
          unit={unit}
          heading={unit.name}
          subheading={unit.bookname}
          showBreadcrumb={true}
          breadcrumbBackUrl="/games/starters"
          breadcrumbBackLabel="Starters Games"
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

