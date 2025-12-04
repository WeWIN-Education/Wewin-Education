"use client";

import { useMemo } from "react";
import { MatchingGame } from "@/app/components/games/MatchingGame";
import { FlipCardGame } from "@/app/components/games/FlipCardGame";
import { PronunciationGame } from "@/app/components/games/PronunciationGame";
import type { WordItem } from "@/types/games";

type UnitGameSetProps = {
  title: string;
  words: WordItem[];
  autoAudio?: boolean;
};

export function UnitGameSet({ title, words, autoAudio = true }: UnitGameSetProps) {
  // Tự động tạo Matching config từ words
  // English words bên trái, Vietnamese meanings bên phải
  const matchingConfig = useMemo(
    () => ({
      title: `${title} - Matching Game`,
      pairs: words.map((word) => ({
        left: word.text.charAt(0).toUpperCase() + word.text.slice(1), // English word
        right: word.meaning || word.text, // Vietnamese meaning
      })),
      showScore: true,
    }),
    [title, words],
  );

  // Tự động tạo FlipCard config từ words
  const flipCardConfig = useMemo(
    () => ({
      title: `${title} - Flip Card Game`,
      words,
      autoAudio,
    }),
    [title, words, autoAudio],
  );

  // Tự động tạo Pronunciation config từ words
  const pronunciationConfig = useMemo(
    () => ({
      title: `${title} - Pronunciation Game`,
      words,
    }),
    [title, words],
  );

  return (
    <div className="space-y-6">
      <MatchingGame {...matchingConfig} />
      <FlipCardGame {...flipCardConfig} />
      <PronunciationGame {...pronunciationConfig} />
    </div>
  );
}

