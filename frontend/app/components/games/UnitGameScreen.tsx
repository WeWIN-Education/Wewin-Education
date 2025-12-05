"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GameMenu } from "@/app/components/games/GameMenu";
import { PlayerIdModal } from "@/app/components/games/PlayerIdModal";
import { UnitProgress } from "@/app/components/games/UnitProgress";
import { PartSelectionScreen } from "@/app/components/games/PartSelectionScreen";
import type { GameKey, UnitGameConfig } from "@/types/games";
import { DEFAULT_ENABLED_GAMES } from "@/types/games";
import {
  submitScoreToSheet,
  getGameId,
  resetUnitToSheet,
} from "@/app/utils/submitScore";

type UnitGameScreenProps = {
  unit: UnitGameConfig;
  heading: string;
  subheading?: string;
  showBreadcrumb?: boolean;
  breadcrumbBackUrl?: string;
  breadcrumbBackLabel?: string;
  initialPlayerId?: string;
  showIdModal?: boolean;
  onPlayerIdSubmit?: (id: string) => void;
  onPlayerIdSkip?: () => void;
};

type ProgressState = Record<GameKey, boolean>;

const createDefaultProgress = (): ProgressState => ({
  matching: false,
  flip: false,
  speak: false,
  quiz: false,
  memory: false,
  ordering: false,
  scramble: false,
});

const GAME_TITLES: Record<GameKey, string> = {
  matching: "Matching Game",
  flip: "Flip Card Game",
  speak: "Pronunciation Game",
  quiz: "Quiz Game",
  memory: "Memory Game",
  ordering: "Word Ordering Game",
  scramble: "Word Scramble Game",
};

export function UnitGameScreen({ 
  unit, 
  heading, 
  subheading,
  showBreadcrumb = false,
  breadcrumbBackUrl = "/resources/kids/Games",
  breadcrumbBackLabel = "Kids Book",
  initialPlayerId = "",
  showIdModal: externalShowIdModal,
  onPlayerIdSubmit: externalOnPlayerIdSubmit,
  onPlayerIdSkip: externalOnPlayerIdSkip,
}: UnitGameScreenProps) {
  const parts = unit.parts ?? [];
  const hasParts = parts.length > 0;

  const router = useRouter();
  const pathname = usePathname();

  const getViewFromPath = (path: string): GameKey | "menu" => {
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (
      last === "matching" ||
      last === "flip" ||
      last === "speak" ||
      last === "quiz" ||
      last === "memory" ||
      last === "ordering" ||
      last === "scramble"
    ) {
      return last as GameKey;
    }
    return "menu";
  };
  
  // Mode: "select" = chọn part, "play" = chơi game
  const [mode, setMode] = useState<"select" | "play">(hasParts ? "select" : "play");
  const [selectedPartId, setSelectedPartId] = useState(
    hasParts && parts[0] ? parts[0].id : "default",
  );

  // Nếu có initialPlayerId từ bên ngoài, dùng nó; nếu không thì dùng state riêng
  const [internalPlayerId, setInternalPlayerId] = useState("");
  const [internalShowIdModal, setInternalShowIdModal] = useState(true);
  
  const playerId = initialPlayerId || internalPlayerId;
  const showIdModal = externalShowIdModal !== undefined ? externalShowIdModal : internalShowIdModal;
  
  const [progress, setProgress] = useState<ProgressState>(createDefaultProgress());
  const [currentView, setCurrentView] = useState<GameKey | "menu">(
    getViewFromPath(pathname),
  );

  // Đồng bộ view khi URL thay đổi (user gõ tay hoặc bấm Back/Forward)
  useEffect(() => {
    setCurrentView(getViewFromPath(pathname));
  }, [pathname]);

  // Load initialPlayerId khi có
  useEffect(() => {
    if (initialPlayerId) {
      setInternalPlayerId(initialPlayerId);
      setInternalShowIdModal(false);
    }
  }, [initialPlayerId]);

  // Load progress từ localStorage khi mount (không xóa khi refresh)
  // Sẽ load lại sau khi activePart được tính toán

  const activePart = useMemo(() => {
    if (!hasParts || parts.length === 0) return undefined;
    return parts.find((part) => part.id === selectedPartId) ?? (parts[0] || undefined);
  }, [hasParts, parts, selectedPartId]);

  // Format title chỉ hiển thị "Part 1" thay vì "Part 1 · Early Journey"
  const getPartTitle = useMemo(() => {
    if (!activePart || !hasParts) return "";
    const index = parts.findIndex((p) => p.id === activePart.id);
    return index >= 0 ? `Part ${index + 1}` : "";
  }, [activePart, hasParts, parts]);

  const words = activePart ? activePart.words : unit.flashcards.words;
  const enabledGames =
    activePart?.enabledGames ??
    unit.enabledGames ??
    DEFAULT_ENABLED_GAMES;
  const quizConfig = activePart?.quiz ?? unit.quiz;
  const progressKey = `unit_${unit.slug}_${activePart ? activePart.id : "default"}_progress`;

  // Load progress khi chuyển part (nhưng không load khi refresh vì đã xóa ở useEffect trên)
  useEffect(() => {
    // Chỉ load progress khi đã có playerId (đã nhập ID)
    if (!playerId) {
      setProgress(createDefaultProgress());
      return;
    }
    
    try {
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ProgressState;
        setProgress({ ...createDefaultProgress(), ...parsed });
      } else {
        setProgress(createDefaultProgress());
      }
    } catch {
      setProgress(createDefaultProgress());
    }
  }, [progressKey, playerId]);

  const handleReset = () => {
    // Kiểm tra xem tất cả games được enable trong unit/part này đã hoàn thành chưa
    // enabledGames có thể là: ["matching", "flip", "speak"] hoặc ["matching", "flip", "quiz"]
    // Chỉ check các game được enable, không check game không được enable
    const allCompleted = enabledGames.every((game) => progress[game]);
    
    if (!allCompleted) {
      // Không cho reset nếu chưa hoàn thành tất cả games được enable trong unit/part này
      const remainingGames = enabledGames.filter((game) => !progress[game]);
      const gameNames = remainingGames
        .map((g) => GAME_TITLES[g])
        .join(", ");
      alert(
        `Bạn cần hoàn thành tất cả các game trước khi reset!\n\nCòn thiếu: ${gameNames}`
      );
      return;
    }

    // Xác nhận reset
    if (
      !confirm(
        "Bạn có chắc muốn reset Unit này? Tất cả tiến độ và điểm sẽ bị xóa!"
      )
    ) {
      return;
    }

    // Gửi signal reset lên Google Sheet
    const unitDisplayName = activePart
      ? `${unit.name} · ${getPartTitle}`
      : unit.name;
    resetUnitToSheet({
      id: playerId || "anonymous",
      unit: unit.unit, // Unit game ID (ví dụ: "Unit 1", "Unit 8")
      project: unitDisplayName,
      bookname: unit.bookname, // Tên sách
    });

    // Reset progress trong localStorage và state
    const reset = createDefaultProgress();
    setProgress(reset);
    localStorage.removeItem(progressKey);
  };

  const handleGameComplete = (game: GameKey, score?: number) => {
    if (!enabledGames.includes(game)) return;
    setProgress((prev) => {
      if (prev[game]) return prev;
      const next = { ...prev, [game]: true };
      localStorage.setItem(progressKey, JSON.stringify(next));
      return next;
    });

    // Gửi điểm lên Google Sheet nếu có score (chỉ với matching, speak và memory)
    if (score !== undefined && (game === "matching" || game === "speak" || game === "memory")) {
      const unitDisplayName = activePart
        ? `${unit.name} · ${getPartTitle}`
        : unit.name;
      submitScoreToSheet({
        id: playerId || "anonymous",
        unit: unit.unit, // Unit game ID (ví dụ: "Unit 1", "Unit 8")
        project: unitDisplayName,
        game_id: getGameId(game),
        score: score,
        bookname: unit.bookname, // Tên sách
      });
    }
  };

  const handleSubmitPlayerId = (id: string) => {
    if (externalOnPlayerIdSubmit) {
      externalOnPlayerIdSubmit(id);
    } else {
      setInternalPlayerId(id);
      setInternalShowIdModal(false);
    }
  };

  const handleSkipPlayerId = () => {
    if (externalOnPlayerIdSkip) {
      externalOnPlayerIdSkip();
    } else {
      setInternalPlayerId("anonymous");
      setInternalShowIdModal(false);
    }
  };

  const handleSelectPart = (partId: string) => {
    setSelectedPartId(partId);
    setCurrentView("menu");
    setMode("play");
    // Progress sẽ được load lại tự động khi selectedPartId thay đổi (qua useEffect)
  };

  const handleBack = () => {
    if (!hasParts) return;

    // Nếu đang ở trong 1 game cụ thể -> quay lại màn chọn game
    if (currentView !== "menu") {
      setCurrentView("menu");
      // Đồng bộ URL về trang unit gốc (không có /matching, /flip,...)
      router.push(`/resources/kids/Games/${unit.slug}`);
      return;
    }

    // Đang ở màn chọn game -> quay lại màn chọn Part
    setMode("select");
  };

  // Nếu đang ở mode "select", hiển thị màn hình chọn part
  if (mode === "select" && hasParts) {
    return (
      <>
        <PartSelectionScreen
          unit={unit}
          heading={heading}
          onSelectPart={handleSelectPart}
          showBreadcrumb={showBreadcrumb}
          breadcrumbBackUrl={breadcrumbBackUrl}
          breadcrumbBackLabel={breadcrumbBackLabel}
        />
        <PlayerIdModal
          isOpen={showIdModal}
          onSubmit={handleSubmitPlayerId}
          onSkip={handleSkipPlayerId}
        />
      </>
    );
  }

  // Sử dụng một màu nền thống nhất cho tất cả các game để đảm bảo thẩm mỹ đồng nhất
  // Không dùng gradient nữa để khi nội dung co giãn chiều cao, màu vẫn đồng nhất.
  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Breadcrumb Navigation */}
      {showBreadcrumb && (
        <div className="pt-4 sm:pt-6 mb-4">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/80 shadow-md hover:shadow-lg transition-all">
              {/* Crumb 1: Kids Book (về trang sách tổng) */}
              <Link
                href={breadcrumbBackUrl}
                className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors group"
              >
                <span className="text-base sm:text-lg">📚</span>
                <span className="text-sm sm:text-base">{breadcrumbBackLabel}</span>
              </Link>
              <span className="text-gray-400">/</span>

              {currentView === "menu" ? (
                // Đang ở màn chọn game: chỉ hiển thị tên Unit
                <span className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-semibold">
                  <span className="text-base sm:text-lg">📖</span>
                  <span className="text-sm sm:text-base">{unit.name}</span>
                </span>
              ) : (
                <>
                  {/* Crumb 2: tên Unit, bấm để quay lại trang chọn game */}
                  <Link
                    href={`/resources/kids/Games/${unit.slug}`}
                    className="flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <span className="text-base sm:text-lg">📖</span>
                    <span className="text-sm sm:text-base">{unit.name}</span>
                  </Link>
                  <span className="text-gray-400">/</span>
                  {/* Crumb 3: tên game hiện tại, không click */}
                  <span className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-semibold">
                    <span className="text-base sm:text-lg">🎮</span>
                    <span className="text-sm sm:text-base">
                      {GAME_TITLES[currentView]}
                    </span>
                  </span>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Header với tiêu đề Part ở giữa và nút quay lại phía trên/ dưới, không đè nhau */}
      <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 mb-4 sm:mb-6 flex flex-col items-center gap-3 sm:gap-4 text-center">
        <h1
          className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 drop-shadow-lg"
          style={{ textShadow: "0 12px 25px rgba(0,0,0,0.3)" }}
        >
          {activePart ? activePart.title : heading}
        </h1>

        {hasParts && (
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 shadow-lg transition"
          >
            <span>←</span>
            <span className="hidden sm:inline">
              {currentView === "menu" ? "Quay lại chọn Part" : "Quay lại chọn Game"}
            </span>
            <span className="sm:hidden">
              {currentView === "menu" ? "Quay lại" : "Quay lại game"}
            </span>
          </button>
        )}
      </div>

      <div className="w-full">
        <GameMenu
          key={activePart ? `${unit.slug}-${activePart.id}` : unit.slug}
          title={activePart ? activePart.title : unit.name}
          description={undefined}
          words={words}
          autoAudio={unit.flashcards.autoAudio}
          enabledGames={enabledGames}
          quizConfig={quizConfig}
          wordOrderingConfig={unit.wordOrdering}
          wordScrambleConfig={unit.wordScramble}
          onGameComplete={handleGameComplete}
          playerId={playerId}
          unitName={activePart ? activePart.title : unit.name}
          bookname={unit.bookname}
          slug={unit.slug}
          activeView={currentView}
          onChangeView={setCurrentView}
        />

        <UnitProgress
          title={activePart ? activePart.title : unit.name}
          games={enabledGames}
          progress={progress}
          onReset={handleReset}
        />
      </div>

      <PlayerIdModal
        isOpen={showIdModal}
        onSubmit={handleSubmitPlayerId}
        onSkip={handleSkipPlayerId}
      />
    </div>
  );
}

