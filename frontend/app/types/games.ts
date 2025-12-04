export type WordItem = {
  id: string;
  text: string;
  icon?: string; // Icon URL (tùy chọn)
  emoji?: string; // Emoji (tùy chọn)
  meaning?: string; // Nghĩa tiếng Việt (tùy chọn)
  audio?: string;
};

export type FlashcardGameConfig = {
  title: string;
  words: WordItem[];
  autoAudio?: boolean;
};

export type QuizOption = {
  label: string;
  value: string;
};

export type QuizGameConfig = {
  title: string;
  question: string;
  answer: string;
  options: QuizOption[];
};

export type MatchingPair = {
  left: string;
  right: string;
};

export type MatchingGameConfig = {
  title: string;
  pairs: MatchingPair[];
  showScore?: boolean; // Hiển thị điểm số
};

export type FlipCardGameConfig = {
  title: string;
  words: WordItem[];
  autoAudio?: boolean;
};

export type PronunciationGameConfig = {
  title: string;
  words: WordItem[];
};

export type MemoryGameConfig = {
  title: string;
  words: WordItem[];
  showScore?: boolean;
};

export type WordOrderingGameConfig = {
  title: string;
  words: WordItem[];
  showScore?: boolean;
};

export type WordScrambleGameConfig = {
  title: string;
  words: WordItem[];
  showScore?: boolean;
};

export type GameKey =
  | "matching"
  | "flip"
  | "speak"
  | "quiz"
  | "memory"
  | "ordering"
  | "scramble";

export const DEFAULT_ENABLED_GAMES: GameKey[] = [
  "matching",
  "flip",
  "speak",
];

export type UnitGamePart = {
  id: string;
  title: string;
  words: WordItem[];
  enabledGames?: GameKey[];
  quiz?: QuizGameConfig;
};

export type UnitGameConfig = {
  slug: string;
  name: string;
  unit: string; // Unit game ID (ví dụ: "Unit 1", "Unit 8")
  bookname: string;
  flashcards: FlashcardGameConfig;
  quiz: QuizGameConfig;
  matching: MatchingGameConfig;
  wordOrdering?: WordOrderingGameConfig;
  wordScramble?: WordScrambleGameConfig;
  enabledGames?: GameKey[];
  parts?: UnitGamePart[];
  backgroundColor?: string; // Màu background theo chủ đề (ví dụ: "from-blue-50 via-purple-50 to-pink-50")
};
