"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { FlashcardGameConfig } from "@/types/games";

type Props = FlashcardGameConfig;

export function FlashcardGame({ title, words, autoAudio = true }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = words[currentIndex];
  const progress = useMemo(
    () => `${currentIndex + 1} / ${words.length}`,
    [currentIndex, words.length],
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  }, [words.length]);

  const handleSpeak = useCallback(() => {
    if (!autoAudio) return;
    const utterance = new SpeechSynthesisUtterance(currentWord.text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }, [autoAudio, currentWord.text]);

  return (
    <section className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-400">
            Flashcard
          </p>
          <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
          {progress}
        </span>
      </header>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onClick={handleSpeak}
          className="rounded-xl border border-dashed border-zinc-200 p-6 text-center transition hover:border-zinc-300"
        >
          {currentWord.icon ? (
            <Image
              src={currentWord.icon}
              alt={currentWord.text}
              width={120}
              height={120}
              className="h-24 w-24 object-contain"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-50 text-5xl">
              {currentWord.text.charAt(0).toUpperCase()}
            </div>
          )}
          <p className="mt-4 text-2xl font-semibold text-zinc-900">
            {currentWord.text}
          </p>
          {autoAudio && (
            <p className="text-sm text-zinc-500">Nhấn để phát âm</p>
          )}
        </button>

        <div className="flex gap-2">
          <button
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:border-zinc-300"
            onClick={handlePrev}
          >
            Trước
          </button>
          <button
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
            onClick={handleNext}
          >
            Tiếp
          </button>
        </div>
      </div>
    </section>
  );
}
