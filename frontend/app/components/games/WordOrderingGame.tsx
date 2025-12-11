"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { WordOrderingGameConfig } from "@/types/games";

type Props = WordOrderingGameConfig & {
  onComplete?: () => void;
};

type WordChoice = {
  id: string;
  text: string;
  originalIndex: number;
};

export function WordOrderingGame({ title, words, showScore = true, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<WordChoice[]>([]);
  const [availableWords, setAvailableWords] = useState<WordChoice[]>([]);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [status, setStatus] = useState("Sắp xếp các từ theo thứ tự bảng chữ cái!");
  const [statusType, setStatusType] = useState<"info" | "correct" | "warning">("info");

  // Chia từng bộ 4-5 từ để sắp xếp
  const currentWordSet = useMemo(() => {
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(5, words.length));
    const sorted = [...selected].sort((a, b) =>
      a.text.localeCompare(b.text, "en", { sensitivity: "base" }),
    );
    return { original: selected, sorted };
  }, [words, currentIndex]);

  // Khởi tạo danh sách từ cho mỗi lượt
  useEffect(() => {
    const wordsWithIndex = currentWordSet.original.map((word, idx) => ({
      id: word.id,
      text: word.text,
      originalIndex: idx,
    }));
    setAvailableWords([...wordsWithIndex].sort(() => Math.random() - 0.5));
    setSelectedWords([]);
    setStatus("Sắp xếp các từ theo thứ tự bảng chữ cái!");
    setStatusType("info");
  }, [currentIndex, currentWordSet]);

  const handleSelectWord = useCallback((word: WordChoice) => {
    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((w) => w.id !== word.id));
  }, []);

  const handleRemoveWord = useCallback((word: WordChoice) => {
    setSelectedWords((prev) => prev.filter((w) => w.id !== word.id));
    setAvailableWords((prev) => [...prev, word].sort(() => Math.random() - 0.5));
  }, []);

  const handleCheck = useCallback(() => {
    if (selectedWords.length !== currentWordSet.sorted.length) {
      setStatus("Hãy sắp xếp đủ tất cả các từ!");
      setStatusType("warning");
      return;
    }

    const isCorrect = selectedWords.every(
      (word, index) => word.id === currentWordSet.sorted[index].id,
    );

    if (isCorrect) {
      const pointsEarned = 15;
      const nextScore = score + pointsEarned;
      setScore(nextScore);
      setCorrectCount((prev) => prev + 1);
      setStatus(`🎉 Tuyệt vời! Bạn đã sắp xếp đúng! +${pointsEarned} điểm (Tổng: ${nextScore} điểm)`);
      setStatusType("correct");

      setTimeout(() => {
        if (currentIndex >= words.length - 1) {
          setStatus(`🌟 Xuất sắc! Bạn đã hoàn thành tất cả! Tổng điểm: ${nextScore} điểm`);
          onComplete?.();
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 1200);
    } else {
      const nextScore = Math.max(0, score - 3);
      setScore(nextScore);
      setStatus(`Ôi, thứ tự chưa đúng. Hãy thử lại nhé! -3 điểm (Tổng: ${nextScore} điểm)`);
      setStatusType("warning");
    }
  }, [selectedWords, currentWordSet, score, currentIndex, words.length, onComplete]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStatus("Sắp xếp các từ theo thứ tự bảng chữ cái!");
    setStatusType("info");
  }, []);

  const progress = ((currentIndex + 1) / Math.max(words.length, 5)) * 100;

  const renderWordButton = (word: WordChoice, onClick: () => void, extra?: ReactNode) => {
    const originalWord = words.find((w) => w.id === word.id);
    return (
      <button
        key={`${word.id}-${word.originalIndex}`}
        onClick={onClick}
        className="bg-white border-2 border-green-300 text-green-700 px-4 py-3 rounded-xl font-bold text-base sm:text-lg shadow-md hover:shadow-lg hover:border-green-500 transition hover:-translate-y-1 flex items-center gap-2"
      >
        <span>{originalWord?.emoji || "📝"}</span>
        <span>{word.text}</span>
        {extra}
      </button>
    );
  };

  return (
    <section className="min-h-screen bg-blue-50 bg-fixed py-8 sm:py-10 px-3 sm:px-4 md:px-6">
      <div className="rounded-2xl border border-green-100 bg-white/95 p-4 sm:p-6 shadow-xl max-w-5xl mx-auto">
      <header className="text-center">
        <p className="text-xs uppercase tracking-wide text-green-400">Word Ordering</p>
        <h2 className="text-lg sm:text-xl font-semibold text-green-900">{title}</h2>
        <p className="mt-2 text-sm text-green-700">
          Sắp xếp các từ theo thứ tự bảng chữ cái (A-Z)!
        </p>
      </header>

      {showScore && (
        <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex-1 text-center">
            <div className="text-sm text-green-600">⭐ Điểm</div>
            <div className="text-xl font-bold text-green-900">{score}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-green-600">📚 Bộ từ</div>
            <div className="text-xl font-bold text-green-900">
              {currentIndex + 1}/{Math.max(words.length, 5)}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-green-600">✅ Đúng</div>
            <div className="text-xl font-bold text-green-900">{correctCount}</div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-center text-base sm:text-lg font-semibold text-green-800 mb-4">
          Thứ tự bạn đã chọn:
        </h3>
        <div className="flex flex-wrap gap-3 justify-center min-h-[80px] p-4 bg-white rounded-xl border-2 border-dashed border-green-300">
          {selectedWords.length === 0 ? (
            <p className="text-gray-400 text-sm sm:text-base">
              Nhấn vào các từ bên dưới để sắp xếp
            </p>
          ) : (
            selectedWords.map((word, index) =>
              renderWordButton(
                word,
                () => handleRemoveWord(word),
                <span className="text-xs bg-white/30 px-2 py-1 rounded-full">{index + 1}</span>,
              ),
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-center text-base sm:text-lg font-semibold text-green-800 mb-4">
          Các từ cần sắp xếp:
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {availableWords.map((word) => renderWordButton(word, () => handleSelectWord(word)))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleCheck}
          disabled={selectedWords.length !== currentWordSet.sorted.length}
          className={`rounded-xl px-6 py-3 font-bold text-white transition w-full sm:w-auto ${
            selectedWords.length !== currentWordSet.sorted.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 hover:shadow-lg"
          }`}
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
              : "bg-green-100 text-green-800"
        }`}
      >
        {status}
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      </div>
    </section>
  );
}


