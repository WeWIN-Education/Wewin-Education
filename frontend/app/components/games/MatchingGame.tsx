"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import type { MatchingGameConfig } from "@/types/games";

type Props = MatchingGameConfig;

type MatchItem = {
  id: string;
  left: string;
  right: string;
};

export function MatchingGame({ title, pairs, showScore = true }: Props) {
  const [leftSelection, setLeftSelection] = useState<string | null>(null);
  const [rightSelection, setRightSelection] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [status, setStatus] = useState("Chọn một thẻ ở mỗi cột để nối.");

  // Tạo danh sách items với ID để track matching
  const matchItems = useMemo<MatchItem[]>(() => {
    return pairs.map((pair, index) => ({
      id: `pair-${index}`,
      left: pair.left,
      right: pair.right,
    }));
  }, [pairs]);

  // Shuffle items
  const shuffledLeft = useMemo(() => {
    return [...matchItems].sort(() => Math.random() - 0.5);
  }, [matchItems]);

  const shuffledRight = useMemo(() => {
    return [...matchItems].sort(() => Math.random() - 0.5);
  }, [matchItems]);

  const handleLeftClick = useCallback((itemId: string) => {
    if (matched.has(itemId)) return;
    
    if (leftSelection === itemId) {
      setLeftSelection(null);
      setStatus("Chọn một thẻ ở mỗi cột để nối.");
    } else {
      setLeftSelection(itemId);
      setStatus("Hãy chọn thêm một thẻ ở cột còn lại.");
    }
  }, [leftSelection, matched]);

  const handleRightClick = useCallback(
    (itemId: string) => {
      if (matched.has(itemId)) return;
      
      if (!leftSelection) {
        setRightSelection(itemId);
        setStatus("Hãy chọn thêm một thẻ ở cột còn lại.");
        return;
      }

      // Kiểm tra xem có match không
      const leftItem = matchItems.find((item) => item.id === leftSelection);
      const rightItem = matchItems.find((item) => item.id === itemId);

      if (leftItem && rightItem && leftItem.id === rightItem.id) {
        // Match đúng!
        setMatched((prev) => new Set([...prev, itemId]));
        setMatchedCount((prev) => prev + 1);
        setScore((prev) => prev + 10);
        setStatus(
          `🎉 Tuyệt vời! Bạn nối đúng rồi. +10 điểm! (Tổng: ${score + 10} điểm)`,
        );
        setLeftSelection(null);
        setRightSelection(null);

        if (matchedCount + 1 === matchItems.length) {
          setStatus(
            `🌟 Bạn đã hoàn thành tất cả các cặp từ! Tổng điểm: ${score + 10} điểm`,
          );
        }
      } else {
        // Match sai
        setScore((prev) => Math.max(0, prev - 2));
        setStatus(
          `Ôi, chưa đúng đâu. Hãy thử lại nhé! -2 điểm (Tổng: ${Math.max(0, score - 2)} điểm)`,
        );
        setLeftSelection(null);
        setRightSelection(null);
      }
    },
    [leftSelection, matched, matchItems, score, matchedCount],
  );

  return (
    <section className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <header>
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          Matching
        </p>
        <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>
        <p className="text-sm text-zinc-500">
          Nối từ tiếng Anh ở cột trái với nghĩa tiếng Việt ở cột phải.
        </p>
      </header>

      {showScore && (
        <div className="mt-4 text-center font-bold text-blue-600">
          Điểm: <span>{score}</span> | Cặp đã nối: <span>{matchedCount}</span>/
          <span>{matchItems.length}</span>
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-3 rounded-2xl bg-blue-50 p-5">
          <h3 className="mb-4 text-center text-lg font-semibold text-blue-900">
            🇬🇧 English
          </h3>
          {shuffledLeft.map((item) => {
            const isSelected = leftSelection === item.id;
            const isMatched = matched.has(item.id);
            return (
              <button
                key={`left-${item.id}`}
                onClick={() => handleLeftClick(item.id)}
                disabled={isMatched}
                className={`flex w-full items-center justify-between rounded-full border-2 px-4 py-3 text-lg transition ${
                  isMatched
                    ? "border-emerald-500 bg-emerald-100 text-emerald-700 cursor-default"
                    : isSelected
                      ? "border-blue-900 bg-blue-900 text-white"
                      : "border-blue-200 bg-white hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <span>{item.left}</span>
                {isMatched && (
                  <span className="text-sm">✓</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 rounded-2xl bg-yellow-50 p-5">
          <h3 className="mb-4 text-center text-lg font-semibold text-yellow-900">
            🇻🇳 Nghĩa tiếng Việt
          </h3>
          {shuffledRight.map((item) => {
            const isSelected = rightSelection === item.id;
            const isMatched = matched.has(item.id);
            return (
              <button
                key={`right-${item.id}`}
                onClick={() => handleRightClick(item.id)}
                disabled={isMatched}
                className={`w-full rounded-full border-2 px-4 py-3 text-left text-base font-medium transition ${
                  isMatched
                    ? "border-emerald-500 bg-emerald-100 text-emerald-700 cursor-default"
                    : isSelected
                      ? "border-yellow-600 bg-yellow-200"
                      : "border-yellow-200 bg-white hover:border-yellow-300 hover:shadow-md"
                }`}
              >
                {item.right}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center font-bold text-blue-600">
        {status}
      </div>
    </section>
  );
}
