"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import type {
  GameKey,
  QuizGameConfig,
  WordItem,
  WordOrderingGameConfig,
  WordScrambleGameConfig,
} from "@/types/games";
import { DEFAULT_ENABLED_GAMES } from "@/types/games";

const MatchingGame = dynamic(
  () =>
    import("@/app/components/games/MatchingGame").then(
      (m) => m.MatchingGame
    ),
  { ssr: false }
);

const FlipCardGame = dynamic(
  () =>
    import("@/app/components/games/FlipCardGame").then(
      (m) => m.FlipCardGame
    ),
  { ssr: false }
);

const PronunciationGame = dynamic(
  () =>
    import("@/app/components/games/PronunciationGame").then(
      (m) => m.PronunciationGame
    ),
  { ssr: false }
);

const QuizGame = dynamic(
  () => import("@/app/components/games/QuizGame").then((m) => m.QuizGame),
  { ssr: false }
);

const MemoryGame = dynamic(
  () => import("@/app/components/games/MemoryGame").then((m) => m.MemoryGame),
  { ssr: false }
);

const WordOrderingGame = dynamic(
  () =>
    import("@/app/components/games/WordOrderingGame").then(
      (m) => m.WordOrderingGame
    ),
  { ssr: false }
);

const WordScrambleGame = dynamic(
  () =>
    import("@/app/components/games/WordScrambleGame").then(
      (m) => m.WordScrambleGame
    ),
  { ssr: false }
);

type GameMenuProps = {
  title: string;
  description?: string;
  words: WordItem[];
  autoAudio?: boolean;
  enabledGames?: GameKey[];
  quizConfig?: QuizGameConfig;
  wordOrderingConfig?: WordOrderingGameConfig;
  wordScrambleConfig?: WordScrambleGameConfig;
  onGameComplete?: (game: GameKey, score?: number) => void;
  playerId?: string;
  unitName?: string;
  bookname?: string;
  slug?: string;
  partId?: string;
  allowNavigation?: boolean;
  activeView?: GameType | "menu";
  onChangeView?: (view: GameType | "menu") => void;
};

type GameType = GameKey;

export function GameMenu({
  title,
  description,
  words,
  autoAudio = true,
  enabledGames,
  quizConfig,
  wordOrderingConfig,
  wordScrambleConfig,
  onGameComplete,
  playerId,
  unitName,
  bookname,
  slug,
  partId,
  allowNavigation = true,
  activeView,
  onChangeView,
}: GameMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Xác định game từ URL nếu có dạng .../[slug]/matching
  const { pathSegments, urlGame } = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const gameFromUrl: GameType | "menu" =
      lastSegment === "matching" ||
      lastSegment === "flip" ||
      lastSegment === "speak" ||
      lastSegment === "quiz" ||
      lastSegment === "memory" ||
      lastSegment === "ordering" ||
      lastSegment === "scramble"
        ? (lastSegment as GameType)
        : "menu";

    return { pathSegments: segments, urlGame: gameFromUrl };
  }, [pathname]);

  // Local state nếu component không được điều khiển từ bên ngoài
  const [internalView, setInternalView] = useState<GameType | "menu">(urlGame);

  const currentView = activeView ?? internalView;
  const setView = onChangeView ?? setInternalView;

  const gamesToShow = useMemo(
    () => enabledGames ?? DEFAULT_ENABLED_GAMES,
    [enabledGames]
  );

  // Đồng bộ view khi URL đổi (back/forward)
  useEffect(() => {
    setInternalView(urlGame);
  }, [urlGame]);

  // Tạo config cho các game
  const matchingConfig = useMemo(
    () => ({
      title: "Matching Game",
      pairs: words.map((word) => ({
        left: word.text.charAt(0).toUpperCase() + word.text.slice(1),
        right: word.meaning || word.text,
      })),
      showScore: true,
    }),
    [words]
  );

  const flipCardConfig = useMemo(
    () => ({
      title: "Flip Card Game",
      words,
      autoAudio,
    }),
    [autoAudio, words]
  );

  const pronunciationConfig = useMemo(
    () => ({
      title: "Pronunciation Game",
      words,
    }),
    [words]
  );

  const memoryConfig = useMemo(
    () => ({
      title: "Memory Game",
      words,
      showScore: true,
    }),
    [words]
  );

  const orderingConfig = useMemo(
    () =>
      wordOrderingConfig ?? {
        title: `${title} - Word Ordering`,
        words,
        showScore: true,
      },
    [title, wordOrderingConfig, words]
  );

  const scrambleConfig = useMemo(
    () =>
      wordScrambleConfig ?? {
        title: `${title} - Word Scramble`,
        words,
        showScore: true,
      },
    [title, wordScrambleConfig, words]
  );

  const generatedQuizConfig = useMemo<QuizGameConfig>(() => {
    if (!words.length) {
      return {
        title: `${title} - Quiz`,
        question: "Không có dữ liệu câu hỏi",
        answer: "",
        options: [],
      };
    }

    const correctWord = words[0];
    const distractors = words.slice(1, 4);
    const options = [correctWord, ...distractors]
      .map((word) => ({
        label: word.text.charAt(0).toUpperCase() + word.text.slice(1),
        value: word.id,
      }));

    return {
      title: `${title} - Quiz`,
      question: `Từ nào đúng cho "${correctWord.meaning ?? correctWord.text}"?`,
      answer: correctWord.id,
      options,
    };
  }, [title, words]);

  const quizConfigToUse = quizConfig ?? generatedQuizConfig;

  const openGame = useCallback(
    (gameType: GameType) => {
      if (!gamesToShow.includes(gameType)) return;

      // Nếu có slug → điều hướng kèm part (nếu có) để đồng bộ với UnitGameScreen
      if (allowNavigation && slug) {
        const gamesIndex = pathSegments.findIndex((seg) => seg === "Games");
        if (gamesIndex >= 0) {
          const base = "/" + pathSegments.slice(0, gamesIndex + 1).join("/");
          const partSegment = partId ? `/${partId}` : "";
          const targetUrl = `${base}/${slug}${partSegment}/${gameType}`;

          if (pathname !== targetUrl) {
            router.prefetch(targetUrl);
            startTransition(() => {
              setView(gameType);
              router.push(targetUrl);
            });
            return;
          }
        }
      }

      // Nếu không có slug hoặc không xác định được base, chỉ set view tại chỗ
      setView(gameType);
    },
    [
      allowNavigation,
      gamesToShow,
      partId,
      pathname,
      pathSegments,
      router,
      setView,
      slug,
      startTransition,
    ]
  );

  if (currentView !== "menu") {
    return (
      <div className="w-full min-h-screen bg-transparent py-8 sm:py-10 px-3 sm:px-4 md:px-6">
        <div className="w-full text-black max-w-5xl mx-auto">
          {currentView === "matching" && (
            <MatchingGame
              {...matchingConfig}
              onComplete={(score) => onGameComplete?.("matching", score)}
            />
          )}
          {currentView === "flip" && (
            <FlipCardGame
              {...flipCardConfig}
              onComplete={() => onGameComplete?.("flip")}
            />
          )}
          {currentView === "speak" && (
            <PronunciationGame
              {...pronunciationConfig}
              onComplete={(score) => onGameComplete?.("speak", score)}
            />
          )}
          {currentView === "quiz" && (
            <QuizGame
              {...quizConfigToUse}
              onComplete={() => onGameComplete?.("quiz")}
            />
          )}
          {currentView === "memory" && (
            <MemoryGame
              {...memoryConfig}
              onComplete={(score) => onGameComplete?.("memory", score)}
            />
          )}
          {currentView === "ordering" && (
            <WordOrderingGame
              {...orderingConfig}
              onComplete={() => onGameComplete?.("ordering")}
            />
          )}
          {currentView === "scramble" && (
            <WordScrambleGame
              {...scrambleConfig}
              onComplete={() => onGameComplete?.("scramble")}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent px-4 py-10 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
        {gamesToShow.includes("matching") && (
          <button
            onClick={() => openGame("matching")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>🔍</span>
              <span>👁️</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Matching Game</div>
          </button>
        )}

        {gamesToShow.includes("flip") && (
          <button
            onClick={() => openGame("flip")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>🔍</span>
              <span>🔊</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Flip Card Game</div>
          </button>
        )}

        {gamesToShow.includes("speak") && (
          <button
            onClick={() => openGame("speak")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>📚</span>
              <span>🌙</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Pronunciation Game</div>
          </button>
        )}

        {gamesToShow.includes("quiz") && (
          <button
            onClick={() => openGame("quiz")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>❓</span>
              <span>🧠</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Quiz Game</div>
          </button>
        )}

        {gamesToShow.includes("memory") && (
          <button
            onClick={() => openGame("memory")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>🧠</span>
              <span>🎴</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Memory Game</div>
          </button>
        )}

        {gamesToShow.includes("ordering") && (
          <button
            onClick={() => openGame("ordering")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>🔤</span>
              <span>📚</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
              Word Ordering Game
            </div>
          </button>
        )}

        {gamesToShow.includes("scramble") && (
          <button
            onClick={() => openGame("scramble")}
            className="bg-blue-100 rounded-3xl p-8 sm:p-10 text-center cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl min-h-[220px] sm:min-h-[250px] flex flex-col justify-center items-center w-full"
          >
            <div className="flex gap-4 justify-center mb-4 text-4xl sm:text-5xl">
              <span>🧩</span>
              <span>🔤</span>
            </div>
            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">
              Word Scramble Game
            </div>
          </button>
        )}
      </div>
      </div>
    </div>
  );
}

