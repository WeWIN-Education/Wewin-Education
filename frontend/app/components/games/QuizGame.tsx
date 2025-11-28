"use client";

import { useCallback, useState } from "react";
import type { QuizGameConfig } from "@/types/games";

type Props = QuizGameConfig;

export function QuizGame({ title, question, options, answer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback(
    (value: string) => () => {
      setSelected(value);
    },
    [],
  );

  const state = selected
    ? selected === answer
      ? "correct"
      : "wrong"
    : "idle";

  return (
    <section className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-400">Quiz</p>
          <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
        </div>
        {state !== "idle" && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              state === "correct"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {state === "correct" ? "Chính xác" : "Chưa đúng"}
          </span>
        )}
      </header>

      <p className="mt-4 text-lg font-medium text-zinc-800">{question}</p>

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
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
