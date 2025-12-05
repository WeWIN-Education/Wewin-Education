"use client";

import { useMemo, useState, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MatchingGame } from "@/app/components/games/MatchingGame";
import { FlipCardGame } from "@/app/components/games/FlipCardGame";
import { PronunciationGame } from "@/app/components/games/PronunciationGame";
import { QuizGame } from "@/app/components/games/QuizGame";
import { MemoryGame } from "@/app/components/games/MemoryGame";
import { WordOrderingGame } from "@/app/components/games/WordOrderingGame";
import { WordScrambleGame } from "@/app/components/games/WordScrambleGame";
import type {
  GameKey,
  QuizGameConfig,
  WordItem,
  WordOrderingGameConfig,
  WordScrambleGameConfig,
} from "@/types/games";
import { DEFAULT_ENABLED_GAMES } from "@/types/games";

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
  activeView,
  onChangeView,
}: GameMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Xác định game từ URL nếu có dạng .../[slug]/matching
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1];
  const urlGame: GameType | "menu" =
    lastSegment === "matching" ||
    lastSegment === "flip" ||
    lastSegment === "speak" ||
    lastSegment === "quiz" ||
    lastSegment === "memory" ||
    lastSegment === "ordering" ||
    lastSegment === "scramble"
      ? (lastSegment as GameType)
      : "menu";

  // Local state nếu component không được điều khiển từ bên ngoài
  const [internalView, setInternalView] = useState<GameType | "menu">(urlGame);

  const currentView = activeView ?? internalView;
  const setView = onChangeView ?? setInternalView;

  const gamesToShow = enabledGames ?? DEFAULT_ENABLED_GAMES;

  // Đồng bộ view khi URL đổi (back/forward)
  useEffect(() => {
    setInternalView(urlGame);
  }, [urlGame]);

  // Tạo config cho các game
  const matchingConfig = {
    title: "Matching Game",
    pairs: words.map((word) => ({
      left: word.text.charAt(0).toUpperCase() + word.text.slice(1),
      right: word.meaning || word.text,
    })),
    showScore: true,
  };

  const flipCardConfig = {
    title: "Flip Card Game",
    words,
    autoAudio,
  };

  const pronunciationConfig = {
    title: "Pronunciation Game",
    words,
  };

  const memoryConfig = {
    title: "Memory Game",
    words,
    showScore: true,
  };

  const orderingConfig = wordOrderingConfig ?? {
    title: `${title} - Word Ordering`,
    words,
    showScore: true,
  };

  const scrambleConfig = wordScrambleConfig ?? {
    title: `${title} - Word Scramble`,
    words,
    showScore: true,
  };

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

  const openGame = (gameType: GameType) => {
    if (!gamesToShow.includes(gameType)) return;

    // Nếu có slug, điều hướng URL tới /[slug]/[game]
    if (slug) {
      // Tự động detect base path từ pathname hiện tại (hỗ trợ nhiều sách)
      // Ví dụ: /resources/kids/Games/unit-1 -> base = /resources/kids/Games
      //        /resources/mover/Games/unit-1 -> base = /resources/mover/Games
      const pathSegments = pathname.split("/").filter(Boolean);
      const gamesIndex = pathSegments.findIndex((seg) => seg === "Games");
      if (gamesIndex >= 0) {
        const base = "/" + pathSegments.slice(0, gamesIndex + 1).join("/");
        let targetUrl = "";
        if (gameType === "matching") targetUrl = `${base}/${slug}/matching`;
        if (gameType === "flip") targetUrl = `${base}/${slug}/flip`;
        if (gameType === "speak") targetUrl = `${base}/${slug}/speak`;
        if (gameType === "quiz") targetUrl = `${base}/${slug}/quiz`;
        if (gameType === "memory") targetUrl = `${base}/${slug}/memory`;
        if (gameType === "ordering") targetUrl = `${base}/${slug}/ordering`;
        if (gameType === "scramble") targetUrl = `${base}/${slug}/scramble`;
        
        if (targetUrl) {
          // Prefetch route để tăng tốc navigation
          router.prefetch(targetUrl);
          // Set view trước khi navigate để tránh flash về menu
          startTransition(() => {
            setView(gameType);
            router.push(targetUrl);
          });
        }
      }
    } else {
      // Nếu không có slug, chỉ set view
      setView(gameType);
    }
  };

  if (currentView !== "menu") {
    return (
      <div className="w-full bg-blue-50 py-2 sm:py-3">
        <div className="w-full px-3 sm:px-4 md:px-6 text-black">
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
    <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
      <div className="text-center mb-6">
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
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
  );
}

