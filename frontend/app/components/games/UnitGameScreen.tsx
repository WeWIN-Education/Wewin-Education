"use client";

import { 
  useEffect, 
  useMemo, 
  useRef, 
  useState, 
  useTransition 
} from "react";
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

/* ---------------------------------------------------
    TYPES
-----------------------------------------------------*/

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
  unitIndex?: number;
};

type ProgressState = Record<GameKey, boolean>;
type ScoreState = Record<GameKey, number>;

/* ---------------------------------------------------
    DEFAULT STATE HELPERS
-----------------------------------------------------*/

const createDefaultProgress = (): ProgressState => ({
  matching: false,
  flip: false,
  speak: false,
  quiz: false,
  memory: false,
  ordering: false,
  scramble: false,
});

const createDefaultScores = (): ScoreState => ({
  matching: 0,
  flip: 0,
  speak: 0,
  quiz: 0,
  memory: 0,
  ordering: 0,
  scramble: 0,
});

/* ---------------------------------------------------
    GAME TITLE MAP
-----------------------------------------------------*/

const GAME_TITLES: Record<GameKey, string> = {
  matching: "Matching Game",
  flip: "Flip Card Game",
  speak: "Pronunciation Game",
  quiz: "Quiz Game",
  memory: "Memory Game",
  ordering: "Word Ordering Game",
  scramble: "Word Scramble Game",
};

/* ---------------------------------------------------
    MAIN COMPONENT
-----------------------------------------------------*/

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

  // Memoized storage keys to keep dependencies stable
  const modeStorageKey = useMemo(() => `${unit.slug}_mode`, [unit.slug]);
  const partStorageKey = useMemo(() => `${unit.slug}_selected_part`, [unit.slug]);

  /* ---------------------------------------------------
      PATH PARSER → xác định view hiện tại
  -----------------------------------------------------*/

  const getViewFromPath = (path: string): GameKey | "menu" => {
    const segments = path.split("/").filter(Boolean);
    const last = segments[segments.length - 1];

    const valid: GameKey[] = [
      "matching", "flip", "speak", "quiz",
      "memory", "ordering", "scramble"
    ];

    return valid.includes(last as GameKey)
      ? (last as GameKey)
      : "menu";
  };

  const getPartFromPath = (path: string): string | null => {
    const segments = path.split("/").filter(Boolean);
    // Expect path: .../unitSlug/[partId]/[game?]
    if (segments.length >= 3) {
      const maybePart = segments[segments.length - 2];
      return maybePart || null;
    }
    return null;
  };

  /* ---------------------------------------------------
      STATE: mode, selectedPart, playerId
  -----------------------------------------------------*/

  const initialPartFromPath = getPartFromPath(pathname);

  const [mode, setMode] = useState<"select" | "play">(() => {
    if (initialPartFromPath && parts.some((p) => p.id === initialPartFromPath)) {
      return "play";
    }
    // Nếu unit có nhiều part nhưng URL không chỉ định part → ở màn chọn part
    if (hasParts && multipleParts) return "select";
    return hasParts ? "play" : "play";
  });

const [selectedPartId, setSelectedPartId] = useState(() => {
    if (initialPartFromPath && parts.some((p) => p.id === initialPartFromPath)) {
      return initialPartFromPath;
    }
    if (typeof window !== "undefined" && hasParts) {
      const saved = sessionStorage.getItem(partStorageKey);
      if (saved && parts.some((p) => p.id === saved)) return saved;
    }
    // Không ép chọn part khi unit có nhiều part và URL không chỉ định part
    return hasParts && !multipleParts && parts[0] ? parts[0].id : "default";
  });

  const [internalPlayerId, setInternalPlayerId] = useState("");
  const [internalShowIdModal, setInternalShowIdModal] = useState(true);

  const playerId = initialPlayerId || internalPlayerId;
  const showIdModal =
    externalShowIdModal !== undefined
      ? externalShowIdModal
      : internalShowIdModal;

  /* ---------------------------------------------------
      STATE: progress, scores, current view
  -----------------------------------------------------*/

  const [progress, setProgress] = useState<ProgressState>(createDefaultProgress());
  const [scores, setScores] = useState<ScoreState>(createDefaultScores());

  const [currentView, setCurrentView] = useState<GameKey | "menu">(
    getViewFromPath(pathname)
  );

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [isPending, startTransition] = useTransition();

  /* ---------------------------------------------------
      REFS: track previous unit, playerId, part
  -----------------------------------------------------*/

  const prevUnitSlugRef = useRef<string | null>(null);
  const isReturningToMenuRef = useRef(false);

  const prevPlayerIdRef = useRef(playerId);
  const prevPartIdRef = useRef<string>(selectedPartId || "default");
/* ---------------------------------------------------
    useEffect 1 — xử lý khi unit thay đổi
-----------------------------------------------------*/
useEffect(() => {
  if (typeof window === "undefined") return;

  const unitChanged =
    prevUnitSlugRef.current !== null &&
    prevUnitSlugRef.current !== unit.slug;

  const isFirstMount = prevUnitSlugRef.current === null;

  if ((unitChanged || isFirstMount) && !isReturningToMenuRef.current) {
    startTransition(() => {
      const pathPart = getPartFromPath(pathname);
      const firstPartId =
        hasParts && parts[0] ? parts[0].id : "default";

      // Nếu URL đã có part hợp lệ → chọn part đó và mode = play
      if (pathPart && parts.some((p) => p.id === pathPart)) {
        setMode("play");
        setSelectedPartId(pathPart);
        sessionStorage.setItem(modeStorageKey, "play");
        sessionStorage.setItem(partStorageKey, pathPart);
      } else {
        // Unit có nhiều part nhưng URL không chỉ định part → về màn chọn part
        if (hasParts && multipleParts) {
          setMode("select");
          setSelectedPartId("");
          sessionStorage.setItem(modeStorageKey, "select");
          sessionStorage.setItem(partStorageKey, "");
        } else {
          // Unit 1 part hoặc không có part
          const initialPart = hasParts ? firstPartId : "default";
          setMode("play");
          setSelectedPartId(initialPart);
          sessionStorage.setItem(modeStorageKey, "play");
          sessionStorage.setItem(partStorageKey, initialPart);
        }
      }

      prevUnitSlugRef.current = unit.slug;
    });
  }
}, [unit.slug, hasParts, multipleParts, parts.length, pathname, modeStorageKey, partStorageKey]);

/* ---------------------------------------------------
    useEffect 2 — xử lý khi URL/pathname thay đổi
-----------------------------------------------------*/
useEffect(() => {
  const view = getViewFromPath(pathname);
  const partFromPath = getPartFromPath(pathname);

  startTransition(() => {
    setCurrentView(view);

    if (!hasParts) return;

    const modeKey = `${unit.slug}_mode`;
    const partKey = `${unit.slug}_selected_part`;

    // Nếu URL chứa partId hợp lệ, đồng bộ selectedPartId
    if (partFromPath && parts.some((p) => p.id === partFromPath)) {
      setSelectedPartId(partFromPath);
      sessionStorage.setItem(partKey, partFromPath);
    }

    const isGameView =
      view === "matching" ||
      view === "flip" ||
      view === "speak" ||
      view === "quiz" ||
      view === "memory" ||
      view === "ordering" ||
      view === "scramble";

    if (isGameView) {
      setMode("play");
      sessionStorage.setItem(modeKey, "play");

      if (!selectedPartId && parts.length > 0) {
        const first = parts[0].id;
        setSelectedPartId(first);
        sessionStorage.setItem(partKey, first);
      }
    }

    // QUAN TRỌNG: view === "menu" → KHÔNG ép mode  
    // => giữ nguyên mode = "select" nếu user đang ở màn chọn part
  });
}, [pathname, hasParts, selectedPartId, parts.length, unit.slug, parts]);

/* ---------------------------------------------------
    useEffect 3 — load initial playerId nếu có
-----------------------------------------------------*/
useEffect(() => {
  if (initialPlayerId) {
    setInternalPlayerId(initialPlayerId);
    setInternalShowIdModal(false);
  }
}, [initialPlayerId]);

/* ---------------------------------------------------
    activePart memo
-----------------------------------------------------*/
const activePart = useMemo(() => {
  if (!hasParts || parts.length === 0) return undefined;
  return (
    parts.find((p) => p.id === selectedPartId) || parts[0]
  );
}, [hasParts, parts, selectedPartId]);

/* ---------------------------------------------------
    useEffect 4 — xử lý reload trang (reset session)
-----------------------------------------------------*/
const RELOAD_FLAG_KEY = `unit_game_reload_${unit.slug}`;

useEffect(() => {
  if (typeof window === "undefined") return;

  const beforeUnload = () => {
    sessionStorage.setItem(RELOAD_FLAG_KEY, "1");
  };

  window.addEventListener("beforeunload", beforeUnload);

  return () => window.removeEventListener("beforeunload", beforeUnload);
}, [RELOAD_FLAG_KEY]);

/* ---------------------------------------------------
    useEffect 5 — kiểm tra reload và load lại progress
-----------------------------------------------------*/
useEffect(() => {
  if (typeof window === "undefined") return;

  const wasReload = sessionStorage.getItem(RELOAD_FLAG_KEY) === "1";

  const bookPrefix = unit.bookname
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  const partKey = activePart ? activePart.id : "default";
  const playerKey = playerId || "guest";

  const progressKey = `progress_${bookPrefix}_${unit.slug}_${partKey}_${playerKey}`;

  if (wasReload) {
    const unitPrefix = `progress_${bookPrefix}_${unit.slug}_`;

    const keysToClear: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith(unitPrefix)) keysToClear.push(k);
    }

    keysToClear.forEach((k) => sessionStorage.removeItem(k));

    setProgress(createDefaultProgress());
    setScores(createDefaultScores());

    if (!externalOnPlayerIdSubmit && !externalOnPlayerIdSkip) {
      setInternalPlayerId("");
      setInternalShowIdModal(true);
    }

    sessionStorage.removeItem(RELOAD_FLAG_KEY);
    return;
  }

  try {
    const saved = sessionStorage.getItem(progressKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgress({
        ...createDefaultProgress(),
        ...(parsed.progress || {}),
      });
      setScores({
        ...createDefaultScores(),
        ...(parsed.scores || {}),
      });
      return;
    }
  } catch {}

  setProgress(createDefaultProgress());
  setScores(createDefaultScores());
}, [
  unit.slug,
  unit.bookname,
  activePart?.id,
  playerId,
  RELOAD_FLAG_KEY,
  externalOnPlayerIdSubmit,
  externalOnPlayerIdSkip,
]);

/* ---------------------------------------------------
    useEffect 6 — lưu progress & scores vào sessionStorage
-----------------------------------------------------*/
useEffect(() => {
  if (typeof window === "undefined") return;

  const hasProgress = Object.values(progress).some((v) => v);
  const hasScore = Object.values(scores).some((v) => v > 0);

  if (!hasProgress && !hasScore) return;

  const bookPrefix = unit.bookname
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  const partKey = activePart ? activePart.id : "default";
  const playerKey = playerId || "guest";

  const progressKey = `progress_${bookPrefix}_${unit.slug}_${partKey}_${playerKey}`;

  try {
    sessionStorage.setItem(
      progressKey,
      JSON.stringify({ progress, scores })
    );
  } catch {}
}, [
  progress,
  scores,
  unit.bookname,
  unit.slug,
  activePart?.id,
  playerId,
]);

/* ---------------------------------------------------
    useEffect 7 — reset progress khi đổi playerId hoặc part
-----------------------------------------------------*/


useEffect(() => {
  const playerChanged = prevPlayerIdRef.current !== playerId;
  const partChanged = prevPartIdRef.current !== (activePart?.id || "default");

  if (playerChanged || partChanged) {
    const bookPrefix = unit.bookname
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    const oldPart = prevPartIdRef.current;
    const oldPlayer = prevPlayerIdRef.current || "guest";

    const oldKey = `progress_${bookPrefix}_${unit.slug}_${oldPart}_${oldPlayer}`;
    sessionStorage.removeItem(oldKey);

    setProgress(createDefaultProgress());
    setScores(createDefaultScores());

    prevPlayerIdRef.current = playerId;
    prevPartIdRef.current = activePart?.id || "default";
  }
}, [playerId, activePart?.id, unit.bookname, unit.slug]);

/* ---------------------------------------------------
    ACTIVE PART TITLE
-----------------------------------------------------*/
const getPartTitle = useMemo(() => {
  if (!activePart || !hasParts) return "";
  const idx = parts.findIndex((p) => p.id === activePart.id);
  return idx >= 0 ? `Part ${idx + 1}` : "";
}, [activePart, hasParts, parts]);

/* ---------------------------------------------------
    WORDS
-----------------------------------------------------*/
const words = activePart ? activePart.words : unit.flashcards.words;

/* ---------------------------------------------------
    ENABLED GAMES (FIXED – NO DYNAMIC DEPS)
-----------------------------------------------------*/
const enabledGames = useMemo(() => {
  if (activePart?.enabledGames) return activePart.enabledGames;

  if (unit.enabledGames) return unit.enabledGames;

  if (unit.useRotatingGame && unitIndex !== undefined) {
    const idx =
      activePart !== undefined
        ? parts.findIndex((p) => p.id === activePart.id)
        : unitIndex;
    return createStandardGameSet(idx);
  }

  return DEFAULT_ENABLED_GAMES;
}, [
  activePart?.enabledGames,
  unit.enabledGames,
  unit.useRotatingGame,
  unitIndex,
  parts,
  activePart,
]);

const quizConfig = activePart?.quiz ?? unit.quiz;

/* ---------------------------------------------------
    LOCAL PROGRESS KEY (TÍNH TRỰC TIẾP, KHÔNG LƯU TRONG STATE)
-----------------------------------------------------*/
const progressKey = useMemo(() => {
  const bookPrefix = unit.bookname
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");

  const partKey = activePart ? activePart.id : "default";
  const playerKey = playerId || "guest";

  return `progress_${bookPrefix}_${unit.slug}_${partKey}_${playerKey}`;
}, [unit.bookname, unit.slug, activePart, playerId]);

/* ---------------------------------------------------
    NEXT GAME RESOLVER
-----------------------------------------------------*/
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
  const idx = enabledGames.indexOf(current);
  if (idx === -1) return null;
  const next = enabledGames[idx + 1];
  return next ?? null;
};

/* ---------------------------------------------------
    HANDLE RESET UNIT
-----------------------------------------------------*/
const handleReset = () => {
  const allDone = enabledGames.every((g) => progress[g]);

  if (!allDone) {
    const missing = enabledGames.filter((g) => !progress[g]);
    const names = missing.map((g) => GAME_TITLES[g]).join(", ");
    alert(
      `Bạn cần hoàn thành tất cả các game trước khi reset!\n\nCòn thiếu: ${names}`
    );
    return;
  }

  if (!confirm("Bạn có chắc muốn reset toàn bộ tiến độ Unit này không?")) {
    return;
  }

  const unitDisplayName = activePart
    ? `${unit.name} · ${getPartTitle}`
    : unit.name;

  resetUnitToSheet({
    id: playerId || "anonymous",
    unit: unit.unit,
    project: unitDisplayName,
    bookname: unit.bookname,
  });

  setProgress(createDefaultProgress());
  setScores(createDefaultScores());

  sessionStorage.removeItem(progressKey);
};

/* ---------------------------------------------------
    HANDLE GAME COMPLETE (AUTO NAVIGATE, AUTO SAVE)
-----------------------------------------------------*/

const processingGamesRef = useRef<Set<GameKey>>(new Set());

const handleGameComplete = (game: GameKey, score?: number) => {
  if (!enabledGames.includes(game)) return;

  if (processingGamesRef.current.has(game) || progress[game]) {
    return;
  }

  processingGamesRef.current.add(game);

  const displayScore = typeof score === "number" ? score : 100;

  setProgress((prev) => {
    if (prev[game]) return prev;
    return { ...prev, [game]: true };
  });

  setScores((prev) => ({ ...prev, [game]: displayScore }));

  // Gửi điểm lên Sheet nếu game có score
  if (score !== undefined && ["matching", "speak", "memory"].includes(game)) {
    const unitDisplayName = activePart
      ? `${unit.name} · ${getPartTitle}`
      : unit.name;

    submitScoreToSheet({
      id: playerId || "anonymous",
      unit: unit.unit,
      project: unitDisplayName,
      game_id: getGameId(game),
      score,
      bookname: unit.bookname,
    });
  }

  const nextGame = getNextGame(game);
  const gameTitle = GAME_TITLES[game];

  setTimeout(() => {
    if (nextGame) {
      const path = gamePathMap[nextGame];

      startTransition(() => {
        setMode("play");
        setCurrentView(nextGame);
        router.push(`${breadcrumbBackUrl}/${unit.slug}/${path}`);
      });
    } else {
      // Trở về menu game
      startTransition(() => {
        setMode("play");
        setCurrentView("menu");
        router.push(`${breadcrumbBackUrl}/${unit.slug}`);
      });
    }

    processingGamesRef.current.delete(game);
  }, 250);

  setNotificationMessage(`🎉 Bạn đã hoàn thành ${gameTitle}!`);
  setNotificationVisible(true);
};

/* ---------------------------------------------------
    HANDLE PLAYER ID
-----------------------------------------------------*/
const handleSubmitPlayerId = (id: string) => {
  if (externalOnPlayerIdSubmit) externalOnPlayerIdSubmit(id);
  else {
    setInternalPlayerId(id);
    setInternalShowIdModal(false);
  }
};

const handleSkipPlayerId = () => {
  if (externalOnPlayerIdSkip) externalOnPlayerIdSkip();
  else {
    setInternalPlayerId("anonymous");
    setInternalShowIdModal(false);
  }
};

/* ---------------------------------------------------
    HANDLE SELECT PART
-----------------------------------------------------*/
const handleSelectPart = (partId: string) => {
  startTransition(() => {
    setSelectedPartId(partId);
    setMode("play");
    setCurrentView("menu");

    const partKey = `${unit.slug}_selected_part`;
    const modeKey = `${unit.slug}_mode`;

    sessionStorage.setItem(partKey, partId);
    sessionStorage.setItem(modeKey, "play");
    router.push(`${breadcrumbBackUrl}/${unit.slug}/${partId}`);
  });
};

/* ---------------------------------------------------
    GO TO PART SELECTION
-----------------------------------------------------*/
const goToPartSelection = () => {
  if (!multipleParts) return;

  // Đưa về màn chọn Part và điều hướng về URL menu để tránh bị effect khác override
  setMode("select");
  setCurrentView("menu");
  sessionStorage.setItem(`${unit.slug}_mode`, "select");
  sessionStorage.setItem(`${unit.slug}_selected_part`, selectedPartId || (parts[0]?.id ?? "default"));
  router.replace(`${breadcrumbBackUrl}/${unit.slug}`);
};

/* ---------------------------------------------------
    GO TO MENU (TRỞ LẠI CHỌN GAME)
-----------------------------------------------------*/
const goToMenu = () => {
  isReturningToMenuRef.current = true;

  const modeKey = `${unit.slug}_mode`;
  sessionStorage.setItem(modeKey, "play");

  startTransition(() => {
    setCurrentView("menu");
    router.replace(`${breadcrumbBackUrl}/${unit.slug}`);
  });

  setTimeout(() => {
    isReturningToMenuRef.current = false;
  }, 400);
};

/* ---------------------------------------------------
    JSX — UI RENDER
-----------------------------------------------------*/

// Nếu đang ở chế độ chọn part và có nhiều part, hiển thị màn chọn part
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
  <div className="min-h-screen bg-blue-50 p-5 pb-20">

    {/* ---------------------------------------------------
          Breadcrumb
    -----------------------------------------------------*/}
    {showBreadcrumb && (
      <div className="pt-4 sm:pt-6 mb-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 
                          bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/80 
                          shadow-md hover:shadow-lg transition-all">

            {/* Crumb 1 — về trang sách */}
            <Link
              href={breadcrumbBackUrl}
              className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 
                         font-semibold transition-colors group"
            >
              <span className="text-base sm:text-lg">📚</span>
              <span className="text-sm sm:text-base">{breadcrumbBackLabel}</span>
            </Link>

            <span className="text-gray-400">/</span>

            {currentView === "menu" ? (
              <span className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-semibold">
                <span className="text-base sm:text-lg">📖</span>
                <span className="text-sm sm:text-base">{unit.name}</span>
              </span>
            ) : (
              <>
                {/* Crumb 2 — Unit */}
                <Link
                  href={`${breadcrumbBackUrl}/${unit.slug}`}
                  className="flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 
                             font-semibold transition-colors"
                >
                  <span className="text-base sm:text-lg">📖</span>
                  <span className="text-sm sm:text-base">{unit.name}</span>
                </Link>

                <span className="text-gray-400">/</span>

                {/* Crumb 3 — Game */}
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

    {/* ---------------------------------------------------
          Header — Title + Back Button
    -----------------------------------------------------*/}
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 mb-4 sm:mb-6 
                    flex flex-col items-center gap-3 sm:gap-4 text-center">

      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900">
        {activePart ? activePart.title : heading}
      </h1>

      {/* Back button logic */}
      {currentView === "menu" && multipleParts && (
        <button
          onClick={goToPartSelection}
          className="inline-flex items-center justify-center gap-2 rounded-full 
                     bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base 
                     px-4 sm:px-6 py-2 shadow-lg transition"
        >
          <span>←</span>
          <span className="hidden sm:inline">Quay lại chọn Part</span>
          <span className="sm:hidden">Quay lại</span>
        </button>
      )}

      {currentView !== "menu" && (
        <button
          onClick={goToMenu}
          className="inline-flex items-center justify-center gap-2 rounded-full 
                     bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base
                     px-4 sm:px-6 py-2 shadow-lg transition"
        >
          <span>←</span>
          <span className="hidden sm:inline">Quay lại chọn Game</span>
          <span className="sm:hidden">Quay lại</span>
        </button>
      )}
    </div>

    {/* ---------------------------------------------------
          MAIN CONTENT: GameMenu + Progress
    -----------------------------------------------------*/}
    <div className="w-full">
      <GameMenu
        key={activePart ? `${unit.slug}-${activePart.id}` : unit.slug}
        title={activePart ? activePart.title : unit.name}
        words={words}
        description={undefined}
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
        scores={scores}
        onReset={handleReset}
      />
    </div>

    {/* ---------------------------------------------------
          MODALS + NOTIFICATIONS
    -----------------------------------------------------*/}

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

