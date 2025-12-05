"use client";

import { useState } from "react";
import type { GameKey } from "@/types/games";

type UnitProgressProps = {
  title: string;
  games: GameKey[];
  progress: Record<GameKey, boolean>;
  onReset?: () => void;
  externalIsOpen?: boolean;
  onExternalToggle?: () => void;
};

const GAME_META: Record<GameKey, { icon: string; label: string }> = {
  matching: { icon: "🔍", label: "Matching Game" },
  flip: { icon: "🔊", label: "Flip Card Game" },
  speak: { icon: "📚", label: "Pronunciation Game" },
  quiz: { icon: "❓", label: "Quiz Game" },
  memory: { icon: "🧠", label: "Memory Game" },
  ordering: { icon: "🔤", label: "Word Ordering Game" },
  scramble: { icon: "🧩", label: "Word Scramble Game" },
};

export function UnitProgress({ title, games, progress, onReset, externalIsOpen, onExternalToggle }: UnitProgressProps) {
  const allCompleted = games.every((key) => progress[key]);
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Dùng external state nếu có, không thì dùng internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const toggleOpen = () => {
    if (onExternalToggle) {
      onExternalToggle();
    } else {
      setInternalIsOpen((v) => !v);
    }
  };

  const completedCount = games.filter((key) => progress[key]).length;

  return (
    <div className="fixed bottom-4 right-4 z-[1001] flex flex-col items-end gap-2">
      {/* Nút thu gọn / mở rộng */}
      <button
        data-progress-button
        onClick={toggleOpen}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition"
      >
        <span>📊</span>
        <span className="hidden sm:inline">
          Tiến độ: {completedCount}/{games.length}
        </span>
        <span className="sm:hidden">
          {completedCount}/{games.length}
        </span>
        <span>{isOpen ? "▼" : "▲"}</span>
      </button>

      {/* Panel chi tiết - chỉ render khi mở để tránh che mất các phần tử khác */}
      {isOpen && (
        <div className="origin-bottom-right transform transition-all duration-300 scale-100 opacity-100 translate-y-0">
          <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-xl text-sm max-w-xs">
          <h3 className="text-blue-500 mb-3 text-base sm:text-lg font-semibold">
            📊 {title} - Tiến độ
          </h3>

          <div className="space-y-2 text-sm sm:text-base">
            {games.map((key) => {
              const meta = GAME_META[key];
              const isDone = progress[key];
              return (
                <div
                  key={key}
                  className={`flex items-center gap-3 ${
                    isDone ? "text-green-600" : "text-black"
                  }`}
                >
                  <span>{meta.icon}</span>
                  <span>
                    {meta.label}:{" "}
                    <strong>{isDone ? "Đã hoàn thành" : "Chưa chơi"}</strong>
                  </span>
                </div>
              );
            })}
          </div>

          {allCompleted && onReset && (
            <button
              onClick={onReset}
              className="mt-4 w-full bg-red-500 text-white px-5 py-2 rounded-2xl font-bold hover:bg-red-600 transition"
            >
              🔄 Reset Unit
            </button>
          )}
          </div>
        </div>
      )}
    </div>
  );
}

