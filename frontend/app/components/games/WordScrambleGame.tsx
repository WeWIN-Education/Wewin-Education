"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useMemo, useState } from "react";
import type { WordScrambleGameConfig } from "@/types/games";

type Props = WordScrambleGameConfig & {
  onComplete?: () => void;
};

export function WordScrambleGame({ title, words, showScore = true, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState("Sắp xếp các chữ cái để tạo thành từ đúng!");
  const [statusType, setStatusType] = useState<"info" | "correct" | "warning">("info");

  const currentWord = words[currentIndex];

  const scrambledWord = useMemo(() => {
    if (!currentWord) return "";
    const letters = currentWord.text.split("");
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join("").toUpperCase();
  }, [currentWord]);

  const handleSubmit = useCallback(() => {
    if (!userInput.trim()) {
      setStatus("Hãy nhập từ của bạn!");
      setStatusType("warning");
      return;
    }

    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = currentWord.text.toLowerCase();

    if (userAnswer === correctAnswer) {
      const pointsEarned = 10;
      const nextScore = score + pointsEarned;
      setScore(nextScore);
      setCorrectCount((prev) => prev + 1);
      setStatus(
        `🎉 Tuyệt vời! Bạn đã sắp xếp đúng! +${pointsEarned} điểm (Tổng: ${nextScore} điểm)`,
      );
      setStatusType("correct");

      setTimeout(() => {
        if (currentIndex >= words.length - 1) {
          setStatus(
            `🌟 Xuất sắc! Bạn đã hoàn thành tất cả các từ! Tổng điểm: ${nextScore} điểm`,
          );
          onComplete?.();
        } else {
          setCurrentIndex((prev) => prev + 1);
          setUserInput("");
          setStatus("Sắp xếp các chữ cái để tạo thành từ đúng!");
          setStatusType("info");
        }
      }, 1500);
    } else {
      const nextScore = Math.max(0, score - 2);
      setScore(nextScore);
      setStatus(
        `Ôi, chưa đúng đâu. Hãy thử lại nhé! -2 điểm (Tổng: ${nextScore} điểm)`,
      );
      setStatusType("warning");
    }
  }, [userInput, currentWord, score, currentIndex, words.length, onComplete]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setUserInput("");
    setScore(0);
    setCorrectCount(0);
    setStatus("Sắp xếp các chữ cái để tạo thành từ đúng!");
    setStatusType("info");
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const progress = ((currentIndex + 1) / words.length) * 100;

  return (
    <section className="min-h-screen bg-blue-50 bg-fixed py-8 sm:py-10 px-3 sm:px-4 md:px-6">
      <div className="rounded-2xl border border-purple-100 bg-white/95 p-4 sm:p-6 shadow-xl max-w-5xl mx-auto">
      <header className="text-center">
        <p className="text-xs uppercase tracking-wide text-purple-400">Word Scramble</p>
        <h2 className="text-lg sm:text-xl font-semibold text-purple-900">{title}</h2>
        <p className="mt-2 text-sm text-purple-700">
          Sắp xếp lại các chữ cái để tạo thành từ đúng!
        </p>
      </header>

      {showScore && (
        <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex-1 text-center">
            <div className="text-sm text-purple-600">⭐ Điểm</div>
            <div className="text-xl font-bold text-purple-900">{score}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-purple-600">📚 Từ</div>
            <div className="text-xl font-bold text-purple-900">
              {currentIndex + 1}/{words.length}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-purple-600">✅ Đúng</div>
            <div className="text-xl font-bold text-purple-900">{correctCount}</div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 sm:p-8 text-center text-white shadow-lg">
        <div className="text-5xl sm:text-6xl mb-4">{currentWord.emoji || "📝"}</div>
        {currentWord.meaning && (
          <div className="text-base sm:text-lg bg-white/25 rounded-lg px-4 py-2 inline-block mb-4">
            {currentWord.meaning}
          </div>
        )}
        <div className="text-3xl sm:text-4xl font-bold mb-4 tracking-wider">
          {scrambledWord}
        </div>
        <p className="text-sm sm:text-base opacity-90">Sắp xếp lại các chữ cái này!</p>
      </div>

      <div className="mt-6">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nhập từ của bạn..."
          className="w-full p-4 sm:p-5 text-center text-xl sm:text-2xl font-bold border-2 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          autoFocus
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-purple-500 px-6 py-3 font-bold text-white transition hover:bg-purple-600 hover:shadow-lg w-full sm:w-auto"
        >
          ✅ Kiểm tra
        </button>
        <button
          onClick={handleReset}
          className="rounded-xl bg-gray-500 px-6 py-3 font-bold text-white transition hover:bg-gray-600 hover:shadow-lg w-full sm:w-auto"
        >
          🔄 Chơi lại
        </button>
      </div>

      <div
        className={`mt-6 rounded-xl p-4 text-center font-bold text-base sm:text-lg ${
          statusType === "correct"
            ? "bg-green-100 text-green-800"
            : statusType === "warning"
              ? "bg-orange-100 text-orange-800"
              : "bg-purple-100 text-purple-800"
        }`}
      >
        {status}
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      </div>
    </section>
  );
}


