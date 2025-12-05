"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { MemoryGameConfig } from "@/types/games";

type Props = MemoryGameConfig & {
  onComplete?: (score: number) => void;
};

type Card = {
  id: string;
  wordId: string;
  text: string;
  emoji?: string;
  meaning?: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export function MemoryGame({ title, words, showScore = true, onComplete }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState("Lật 2 thẻ để tìm cặp từ khớp!");
  const [statusType, setStatusType] = useState<"info" | "correct" | "warning">("info");
  const [isChecking, setIsChecking] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);

  // Âm thanh báo hiệu nối đúng – dùng data URI định dạng WAV nhỏ để mọi trình duyệt hỗ trợ
  const CORRECT_SOUND_SRC =
    "data:audio/wav;base64,UklGRrQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YbAAAAAAgP8AgP8Af/8Af/8Af/8Af/8Af/8Af/8AgP8AgP8AgP8AgP8AgP8AgP8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8Af/8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8AgP8A";

  const correctSound = useMemo(() => {
    if (typeof Audio === "undefined") return null;
    const audio = new Audio(CORRECT_SOUND_SRC);
    audio.volume = 0.4;
    return audio;
  }, []);

  const speakCorrect = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance("Correct");
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, []);

  // Tạo bộ thẻ từ danh sách từ
  const initializeCards = useCallback(() => {
    const cardPairs: Card[] = [];

    // Tạo 2 thẻ cho mỗi từ (một thẻ tiếng Anh, một thẻ nghĩa/emoji)
    words.forEach((word) => {
      // Thẻ tiếng Anh
      cardPairs.push({
        id: `word-${word.id}`,
        wordId: word.id,
        text: word.text,
        emoji: word.emoji,
        meaning: word.meaning,
        isFlipped: false,
        isMatched: false,
      });

      // Thẻ nghĩa/emoji
      cardPairs.push({
        id: `meaning-${word.id}`,
        wordId: word.id,
        text: word.meaning || word.text,
        emoji: word.emoji,
        meaning: word.meaning,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Xáo trộn thẻ
    return cardPairs.sort(() => Math.random() - 0.5);
  }, [words]);

  // Khởi tạo game
  useEffect(() => {
    const newCards = initializeCards();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setMoves(0);
    setStatus("Lật 2 thẻ để tìm cặp từ khớp!");
    setStatusType("info");
    setCompleted(false);
    setIsChecking(false);
  }, [initializeCards]);

  const handleCardClick = useCallback(
    (cardId: string) => {
      if (isChecking || flippedCards.length >= 2 || completed) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.isFlipped || card.isMatched) return;

      const newFlipped = [...flippedCards, cardId];

      // Cập nhật trạng thái lật
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)),
      );
      setFlippedCards(newFlipped);

      // Phát âm từ vựng khi lật thẻ (nếu là thẻ tiếng Anh)
      if (card.id.startsWith("word-") && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(card.text);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }

      // Nếu đã lật 2 thẻ, kiểm tra
      if (newFlipped.length === 2) {
        setIsChecking(true);
        const currentMoves = moves + 1;
        setMoves(currentMoves);

        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard && secondCard && firstCard.wordId === secondCard.wordId) {
          // Match đúng!
          
          // Phát âm thanh khi match đúng
          if (correctSound) {
            try {
              correctSound.currentTime = 0;
              void correctSound.play();
            } catch {
              // nếu trình duyệt chặn autoplay thì bỏ qua
            }
          }

          // Hiện popup dấu tick xanh tạm thời
          setShowCorrectPopup(true);
          setTimeout(() => {
            setShowCorrectPopup(false);
          }, 700);

          // Đọc chữ "Correct" để tạo cảm giác giống matching game
          speakCorrect();

          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.wordId === firstCard.wordId ? { ...c, isMatched: true, isFlipped: true } : c,
              ),
            );

            setMatchedPairs((prev) => {
              const newCount = prev + 1;
              const pointsEarned = Math.max(5, 20 - currentMoves * 2); // Càng ít nước đi càng nhiều điểm
              
              setScore((s) => {
                const newScore = s + pointsEarned;
                
                setStatus(
                  `🎉 Tuyệt vời! Bạn đã tìm thấy cặp! +${pointsEarned} điểm (Tổng: ${newScore} điểm)`,
                );
                setStatusType("correct");

                if (newCount === words.length) {
                  // Đã hoàn thành tất cả
                  setTimeout(() => {
                    setStatus(
                      `🌟 Xuất sắc! Bạn đã hoàn thành tất cả các cặp! Tổng điểm: ${newScore} điểm`,
                    );
                    setCompleted(true);
                    onComplete?.(newScore);
                  }, 1000);
                }

                return newScore;
              });

              return newCount;
            });

            setFlippedCards([]);
            setIsChecking(false);
          }, 500);
        } else {
          // Match sai
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c,
              ),
            );
            setFlippedCards([]);
            
            setScore((prev) => {
              const newScore = Math.max(0, prev - 2);
              setStatus(
                `Ôi, chưa khớp đâu. Hãy thử lại nhé! -2 điểm (Tổng: ${newScore} điểm)`,
              );
              setStatusType("warning");
              return newScore;
            });

            setIsChecking(false);
          }, 1000);
        }
      }
    },
    [cards, flippedCards, isChecking, moves, words.length, onComplete, completed, correctSound, speakCorrect],
  );

  const handleReset = useCallback(() => {
    const newCards = initializeCards();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setScore(0);
    setMoves(0);
    setStatus("Lật 2 thẻ để tìm cặp từ khớp!");
    setStatusType("info");
    setIsChecking(false);
    setCompleted(false);
  }, [initializeCards]);

  const progress = (matchedPairs / words.length) * 100;

  return (
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:p-6 shadow-sm relative">
      {/* Popup tick xanh khi match đúng */}
      {showCorrectPopup && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="animate-ping">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-5xl text-white">✓</span>
            </div>
          </div>
        </div>
      )}
      <header className="text-center">
        <p className="text-xs uppercase tracking-wide text-indigo-400">Memory</p>
        <h2 className="text-lg sm:text-xl font-semibold text-indigo-900">{title}</h2>
        <p className="mt-2 text-sm text-indigo-700">
          Lật 2 thẻ để tìm cặp từ khớp!
        </p>
      </header>

      {showScore && (
        <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex-1 text-center">
            <div className="text-sm text-indigo-600">⭐ Điểm</div>
            <div className="text-xl font-bold text-indigo-900">{score}</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-indigo-600">🎯 Cặp</div>
            <div className="text-xl font-bold text-indigo-900">
              {matchedPairs}/{words.length}
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-indigo-600">🔄 Nước đi</div>
            <div className="text-xl font-bold text-indigo-900">{moves}</div>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const isFlipped = card.isFlipped || card.isMatched;
          const isSelected = flippedCards.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isFlipped || isChecking || card.isMatched || completed}
              className={`aspect-square rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 ${
                card.isMatched
                  ? "bg-green-200 border-green-500 cursor-default"
                  : isFlipped
                    ? "bg-white border-indigo-500 shadow-lg"
                    : "bg-indigo-100 border-indigo-300 hover:border-indigo-500 hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-3xl sm:text-4xl mb-2">{card.emoji || "📝"}</div>
                  <div className="text-sm sm:text-base font-bold text-indigo-900 text-center">
                    {card.text}
                  </div>
                  {card.meaning && card.id.startsWith("meaning-") && (
                    <div className="text-xs text-indigo-600 mt-1">{card.meaning}</div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-4xl sm:text-5xl">❓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
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
              : "bg-indigo-100 text-indigo-800"
        }`}
      >
        {status}
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}

