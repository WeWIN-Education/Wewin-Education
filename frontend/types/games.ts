export type FlipCardWord = {
  id: string;
  text: string;
  emoji?: string;
  meaning?: string;
};

export type FlipCardGameConfig = {
  title: string;
  words: FlipCardWord[];
  autoAudio?: boolean;
};

export type FlashcardWord = {
  id?: string;
  text: string;
  icon?: string;
  emoji?: string;
  meaning?: string;
};

export type FlashcardGameConfig = {
  title: string;
  words: FlashcardWord[];
  autoAudio?: boolean;
};

export type QuizOption = {
  value: string;
  label: string;
};

export type QuizGameConfig = {
  title: string;
  question: string;
  options: QuizOption[];
  answer: string;
};

export type MatchingPair = {
  left: string;
  right: string;
};

export type MatchingGameConfig = {
  title: string;
  pairs: MatchingPair[];
  showScore?: boolean;
};

export type PronunciationWord = {
  text: string;
  emoji?: string;
  meaning?: string;
};

export type PronunciationGameConfig = {
  title: string;
  words: PronunciationWord[];
};
export type UnitGameConfig = {
  slug: string;
  name: string;
  flashcards: FlashcardGameConfig;
  quiz: QuizGameConfig;
  matching: MatchingGameConfig;
};
