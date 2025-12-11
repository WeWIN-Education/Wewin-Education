"use client";

import { useCallback, useEffect, useState } from "react";
import type { QuizGameConfig } from "@/types/games";

type Props = QuizGameConfig & { onComplete?: () => void };

export function QuizGame({ title, question, options, answer, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

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

  const handleSelect = useCallback(
    (value: string) => () => {
      setSelected(value);
      if (!completed && value === answer) {
        setCompleted(true);
        // Không gọi onComplete ở đây nữa, để useEffect xử lý
      }
    },
    [answer, completed],
  );

  const state = selected
    ? selected === answer
      ? "correct"
      : "wrong"
    : "idle";

  return (
    <section className="min-h-screen bg-blue-50 bg-fixed py-8 sm:py-10 px-3 sm:px-4 md:px-6">
      <div className="rounded-2xl border border-zinc-100 bg-white/95 p-4 sm:p-6 shadow-xl max-w-5xl mx-auto">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xs uppercase tracking-wide text-zinc-400">Quiz</p>
          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900">{title}</h2>
        </div>
        {state !== "idle" && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium self-center sm:self-auto ${
              state === "correct"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {state === "correct" ? "Chính xác" : "Chưa đúng"}
          </span>
        )}
      </header>

      <p className="mt-4 text-base sm:text-lg font-medium text-zinc-800 text-center sm:text-left">{question}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected === option.value;
          const isAnswer = option.value === answer;
          const variant =
            state === "idle"
              ? "neutral"
              : isAnswer
                ? "correct"
                : isSelected
                  ? "wrong"
                  : "neutral";

          return (
            <button
              key={option.value}
              onClick={handleSelect(option.value)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                variant === "correct"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : variant === "wrong"
                    ? "border-rose-200 bg-rose-50 text-rose-800"
                    : isSelected
                      ? "border-zinc-400 bg-zinc-50"
                      : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <span className="text-sm sm:text-base font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
      </div>
    </section>
  );
}
