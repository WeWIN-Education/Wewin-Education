"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { FlipCardGameConfig } from "@/types/games";

type Props = FlipCardGameConfig & {
  onComplete?: () => void;
};

export function FlipCardGame({ title, words, autoAudio = true, onComplete }: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [revealedCount, setRevealedCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const shuffledWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5);
  }, [words]);

  // Gọi onComplete sau khi completed state đã được cập nhật (tránh lỗi update trong render)
  useEffect(() => {
    if (completed && onComplete) {
      // Sử dụng setTimeout để đảm bảo được gọi sau khi render hoàn tất
      const timer = setTimeout(() => {
        onComplete();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [completed, onComplete]);

  const handleReveal = useCallback(
    (wordId: string, wordText: string) => {
      if (revealed.has(wordId)) return;

      setRevealed((prev) => new Set([...prev, wordId]));
      setRevealedCount((prev) => {
        const next = prev + 1;
        if (!completed && next === words.length) {
          setCompleted(true);
          // Không gọi onComplete ở đây nữa, để useEffect xử lý
        }
        return next;
      });

      // Phát âm tự động
      if (autoAudio && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(wordText);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    },
    [revealed, autoAudio, completed, onComplete, words.length],
  );

  const handleReset = useCallback(() => {
    setRevealed(new Set());
    setRevealedCount(0);
    setCompleted(false);
  }, []);

  return (
    <section className="rounded-2xl border border-orange-100 bg-orange-50 p-4 sm:p-6 shadow-sm">
      <header className="text-center">
     
        <h2 className="text-lg sm:text-xl font-semibold text-orange-900">{title}</h2>
        <p className="mt-2 text-sm text-orange-700">
          Nhấn vào từng thẻ để xem toàn bộ từ và nghe phát âm.
        </p>
      </header>

      <div className="mt-4 text-center text-base sm:text-lg font-bold text-orange-800">
        Đã mở: <span>{revealedCount}</span>/{words.length}
      </div>

      {revealedCount === words.length && (
        <div className="mt-4 text-center text-lg sm:text-xl font-bold text-orange-600">
          🎉 Tuyệt vời! Bạn đã mở hết tất cả các thẻ! 🎉
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shuffledWords.map((word) => {
          const isRevealed = revealed.has(word.id);
          const cleanWord = word.text.replace(/[\s-]/g, "");
          const dots = ".".repeat(Math.max(cleanWord.length - 1, 1));

          return (
            <button
              key={word.id}
              onClick={() => handleReveal(word.id, word.text)}
              disabled={isRevealed}
              className={`rounded-2xl border-2 p-5 sm:p-6 text-center transition-all ${
                isRevealed
                  ? "border-orange-300 bg-orange-100 cursor-default"
                  : "border-orange-200 bg-gradient-to-br from-orange-100 to-orange-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              {isRevealed ? (
                <>
                  <div className="text-3xl sm:text-4xl mb-2">{word.emoji || "📝"}</div>
                  <div className="text-lg sm:text-xl font-bold text-orange-900">
                    {word.text}
                  </div>
                  {word.meaning && (
                    <div className="mt-2 text-sm sm:text-base text-orange-700">
                      {word.meaning}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-3xl sm:text-4xl mb-2">{word.emoji || "📝"}</div>
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">
                    {word.text[0].toUpperCase()}
                    {dots}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleReset}
          className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto"
        >
          🔄 Chơi lại
        </button>
      </div>
    </section>
  );
}

