"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GameMenu } from "@/app/components/games/GameMenu";
import { PlayerIdModal } from "@/app/components/games/PlayerIdModal";
import { UnitProgress } from "@/app/components/games/UnitProgress";
import { PartSelectionScreen } from "@/app/components/games/PartSelectionScreen";
import Notification from "@/app/components/notification";
import type { GameKey, UnitGameConfig } from "@/types/games";
import { DEFAULT_ENABLED_GAMES } from "@/types/games";
import {
  submitScoreToSheet,
  getGameId,
  resetUnitToSheet,
} from "@/app/utils/submitScore";
import { createStandardGameSet } from "@/app/utils/gameRotation";

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
  unitIndex?: number; // Index của unit trong book (dùng cho game xoay vòng)
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
  unitIndex,
}: UnitGameScreenProps) {
  const parts = unit.parts ?? [];
  const hasParts = parts.length > 0;
  const multipleParts = parts.length > 1;

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
  
  const modeStorageKey = `${unit.slug}_mode`;
  const partStorageKey = `${unit.slug}_selected_part`;

  // Mode: "select" = chọn part, "play" = chơi game
  const [mode, setMode] = useState<"select" | "play">(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(modeStorageKey);
      if (saved === "play" || saved === "select") return saved as "select" | "play";
    }
    return hasParts ? (multipleParts ? "select" : "play") : "play";
  });
  const [selectedPartId, setSelectedPartId] = useState(() => {
    if (typeof window !== "undefined" && hasParts) {
      const saved = sessionStorage.getItem(partStorageKey);
      if (saved) return saved;
    }
    return hasParts && parts[0] ? parts[0].id : "default";
  });

  // Nếu có initialPlayerId từ bên ngoài, dùng nó; nếu không thì dùng state riêng
  const [internalPlayerId, setInternalPlayerId] = useState("");
  const [internalShowIdModal, setInternalShowIdModal] = useState(true);
  
  const playerId = initialPlayerId || internalPlayerId;
  const showIdModal = externalShowIdModal !== undefined ? externalShowIdModal : internalShowIdModal;
  
  const [progress, setProgress] = useState<ProgressState>(createDefaultProgress());
  const [currentView, setCurrentView] = useState<GameKey | "menu">(
    getViewFromPath(pathname),
  );
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // Khi đổi unit (slug mới), đưa màn hình về trạng thái mặc định của unit đó
  // Không phụ thuộc trực tiếp vào mảng parts để tránh thay đổi kích thước dependency array
  useEffect(() => {
    startTransition(() => {
      const firstPartId = hasParts && parts[0] ? parts[0].id : "default";
      setSelectedPartId(firstPartId);
      setMode(hasParts ? (multipleParts ? "select" : "play") : "play");
      if (typeof window !== "undefined") {
        sessionStorage.setItem(partStorageKey, firstPartId);
        sessionStorage.setItem(modeStorageKey, hasParts && multipleParts ? "select" : "play");
      }
      setCurrentView("menu");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.slug, hasParts, multipleParts, parts.length]);

  // Đồng bộ view khi URL thay đổi (user gõ tay hoặc bấm Back/Forward)
  useEffect(() => {
    const view = getViewFromPath(pathname);
    
    // Sử dụng startTransition để làm mượt navigation, tránh flash
    startTransition(() => {
      setCurrentView(view);
      
      if (!hasParts) return;
      
      // Nếu URL là game (không phải menu) và có parts, tự động chuyển sang mode "play"
      if (view !== "menu") {
        setMode("play");
        // Nếu chưa có selectedPartId, chọn part đầu tiên
        if (!selectedPartId && parts.length > 0) {
          setSelectedPartId(parts[0].id);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(partStorageKey, parts[0].id);
          }
        }
        if (typeof window !== "undefined") {
          sessionStorage.setItem(modeStorageKey, "play");
        }
      }
    });
  }, [pathname, hasParts, selectedPartId]); // Không thêm currentView và mode để tránh infinite loop

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

  // Đồng bộ mode/part từ sessionStorage sau khi client mount để tránh trạng thái SSR mặc định (select)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedMode = sessionStorage.getItem(modeStorageKey);
    const savedPart = sessionStorage.getItem(partStorageKey);

    if (savedPart && savedPart !== selectedPartId) {
      const exists = parts.some((p) => p.id === savedPart);
      if (exists) setSelectedPartId(savedPart);
    }

    if (savedMode === "play" && mode !== "play") {
      setMode("play");
    }
  }, [modeStorageKey, partStorageKey, parts, selectedPartId, mode]);

  // Khi đang ở menu, nếu đã có part được chọn và mode đang "select" nhưng session lưu "play",
  // thì ép về "play" để ở lại màn chọn game của part hiện tại (tránh bị đẩy về chọn part).
  useEffect(() => {
    if (currentView !== "menu") return;
    if (!multipleParts) return;
    if (!selectedPartId) return;
    if (mode !== "select") return;
    if (typeof window === "undefined") return;
    const savedMode = sessionStorage.getItem(modeStorageKey);
    if (savedMode === "play") {
      setMode("play");
    }
  }, [currentView, multipleParts, selectedPartId, mode, modeStorageKey]);

  // Format title chỉ hiển thị "Part 1" thay vì "Part 1 · Early Journey"
  const getPartTitle = useMemo(() => {
    if (!activePart || !hasParts) return "";
    const index = parts.findIndex((p) => p.id === activePart.id);
    return index >= 0 ? `Part ${index + 1}` : "";
  }, [activePart, hasParts, parts]);

  const words = activePart ? activePart.words : unit.flashcards.words;
  
  // Tính enabledGames: nếu useRotatingGame = true, tự động tính với 3 game cố định + 1 game xoay vòng
  const enabledGames = useMemo(() => {
    // Nếu có part, ưu tiên enabledGames của part
    if (activePart?.enabledGames) {
      return activePart.enabledGames;
    }
    
    // Nếu unit có enabledGames được định nghĩa sẵn, dùng nó
    if (unit.enabledGames) {
      return unit.enabledGames;
    }
    
    // Nếu useRotatingGame = true, tự động tính với game xoay vòng
    if (unit.useRotatingGame && unitIndex !== undefined) {
      // Nếu có part, dùng part index; nếu không, dùng unit index
      const index = activePart 
        ? parts.findIndex((p) => p.id === activePart.id)
        : unitIndex;
      return createStandardGameSet(index);
    }
    
    // Mặc định
    return DEFAULT_ENABLED_GAMES;
  }, [activePart, unit.enabledGames, unit.useRotatingGame, unitIndex, parts]);
  
  const quizConfig = activePart?.quiz ?? unit.quiz;
  // Tạo prefix dựa trên bookname để tránh conflict giữa các sách
  const bookPrefix = unit.bookname.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  const progressKey = `${bookPrefix}_unit_${unit.slug}_${activePart ? activePart.id : "default"}_progress`;

  const gamePathMap: Record<GameKey, string> = {
    matching: "matching",
    flip: "flip",
    speak: "speak",
    quiz: "quiz",
    memory: "memory",
    ordering: "ordering",
    scramble: "scramble",
  };

  const getNextGame = (current: GameKey): GameKey | null => {
    const enabled = enabledGames;
    const idx = enabled.indexOf(current);
    if (idx === -1) return null;
    const next = enabled[idx + 1];
    return next ?? null;
  };

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

    // Tìm game tiếp theo trong part hiện tại
    const nextGame = getNextGame(game);
    const gameTitle = GAME_TITLES[game];

    if (nextGame) {
      // Nếu còn game tiếp theo, chuyển thẳng sang game đó
      const targetPath = gamePathMap[nextGame];
      if (targetPath) {
        startTransition(() => {
          setMode("play");
          setCurrentView(nextGame);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(modeStorageKey, "play");
          }
          router.push(`${breadcrumbBackUrl}/${unit.slug}/${targetPath}`);
        });
      } else {
        // fallback: về menu
        startTransition(() => {
          setMode("play");
          setCurrentView("menu");
          if (typeof window !== "undefined") {
            sessionStorage.setItem(modeStorageKey, "play");
          }
          router.push(`${breadcrumbBackUrl}/${unit.slug}`);
        });
      }
    } else {
      // Nếu đã hết game trong part, quay về menu chọn game của part hiện tại
      startTransition(() => {
        setMode("play");
        setCurrentView("menu");
        if (typeof window !== "undefined") {
          sessionStorage.setItem(modeStorageKey, "play");
        }
        router.push(`${breadcrumbBackUrl}/${unit.slug}`);
      });
    }

    // Thông báo ngắn
    setNotificationMessage(`🎉 Đã chơi xong ${gameTitle}!`);
    setNotificationVisible(true);
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
    startTransition(() => {
      setSelectedPartId(partId);
      setCurrentView("menu");
      setMode("play");
      if (typeof window !== "undefined") {
        sessionStorage.setItem(partStorageKey, partId);
        sessionStorage.setItem(modeStorageKey, "play");
      }
      // Progress sẽ được load lại tự động khi selectedPartId thay đổi (qua useEffect)
    });
  };

  const goToPartSelection = () => {
    if (!multipleParts) return;
    startTransition(() => {
      setMode("select");
      setCurrentView("menu");
      if (typeof window !== "undefined") {
        sessionStorage.setItem(modeStorageKey, "select");
      }
    });
  };

  // Nếu đang ở mode "select" và có nhiều part, hiển thị màn hình chọn part
  if (mode === "select" && multipleParts) {
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

  return (
    <div className="min-h-screen p-5 pb-20 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
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
                    href={`${breadcrumbBackUrl}/${unit.slug}`}
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
          className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900"
        >
          {activePart ? activePart.title : heading}
        </h1>

        {multipleParts && currentView === "menu" && (
          <button
            onClick={goToPartSelection}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 shadow-lg transition"
          >
            <span>←</span>
            <span className="hidden sm:inline">Quay lại chọn Part</span>
            <span className="sm:hidden">Quay lại</span>
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

      <Notification
        message={notificationMessage}
        type="success"
        visible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </div>
  );
}

