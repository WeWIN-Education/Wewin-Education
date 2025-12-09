"use client";
import { useCallback, useMemo, useState } from "react";
import type { MatchingGameConfig } from "@/types/games";

type Props = MatchingGameConfig & {
  onComplete?: (score: number) => void;
};

type MatchItem = {
  id: string;
  left: string;
  right: string;
};

export function MatchingGame({ title, pairs, showScore = true, onComplete }: Props) {
  const [leftSelection, setLeftSelection] = useState<string | null>(null);
  const [rightSelection, setRightSelection] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [status, setStatus] = useState("Chọn một thẻ ở mỗi cột để nối.");
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
        const newScore = score + 10;
        const newMatchedCount = matchedCount + 1;
        setMatched((prev) => new Set([...prev, itemId]));
        setMatchedCount(newMatchedCount);
        setScore(newScore);
        setStatus(`🎉 Tuyệt vời! Bạn nối đúng rồi. +10 điểm! (Tổng: ${newScore} điểm)`);
        setLeftSelection(null);
        setRightSelection(null);

        // Phát âm thanh khi nối đúng
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

        // Đọc chữ "Correct" để tạo cảm giác giống flip card
        speakCorrect();

        if (!completed && newMatchedCount === matchItems.length) {
          setStatus(`🌟 Bạn đã hoàn thành tất cả các cặp từ! Tổng điểm: ${newScore} điểm`);
          setCompleted(true);
          onComplete?.(newScore);
        }
      } else {
        // Match sai
        const newScore = Math.max(0, score - 2);
        setScore(newScore);
        setStatus(`Ôi, chưa đúng đâu. Hãy thử lại nhé! -2 điểm (Tổng: ${newScore} điểm)`);
        setLeftSelection(null);
        setRightSelection(null);
      }
    },
    [leftSelection, matched, matchItems, score, matchedCount, completed, onComplete],
  );

  return (
    <section className="w-full relative min-h-screen bg-blue-50 bg-fixed py-8 sm:py-10 px-3 sm:px-4 md:px-6">
      {/* Popup tick xanh khi nối đúng */}
      {showCorrectPopup && (
        <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/90 text-white text-5xl shadow-2xl">
            ✓
          </div>
        </div>
      )}

      <div className="w-full rounded-[32px] border border-blue-100 bg-white/95 p-4 sm:p-6 md:p-8 shadow-xl text-black max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-blue-100 pb-4 mb-6">
        <div>
        
          <h2 className="text-2xl sm:text-3xl font-bold">{title || "Matching Game"}</h2>
          <p className="text-sm sm:text-base font-medium">
            Ghép đúng các cặp từ tiếng Anh – tiếng Việt để tích điểm.
          </p>
        </div>

        {showScore && (
          <div className="flex flex-wrap gap-3 text-sm sm:text-base font-semibold">
            <span className="px-4 py-2 rounded-2xl bg-blue-50 shadow-inner">
              Điểm: <span>{score}</span>
            </span>
            <span className="px-4 py-2 rounded-2xl bg-amber-50 shadow-inner">
              Cặp đã nối:{" "}
              <span>
                {matchedCount}/{matchItems.length}
              </span>
            </span>
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3 rounded-[28px] bg-gradient-to-b from-blue-50 to-white p-4 sm:p-6 shadow-inner">
          <div className="mb-3 flex items-center justify-center gap-2 font-semibold">
           
            <h3 className="text-lg">English</h3>
          </div>
          {shuffledLeft.map((item) => {
            const isSelected = leftSelection === item.id;
            const isMatched = matched.has(item.id);
            return (
              <button
                key={`left-${item.id}`}
                onClick={() => handleLeftClick(item.id)}
                disabled={isMatched}
                className={`flex w-full items-center justify-between rounded-2xl border-2 px-5 py-4 text-base sm:text-lg transition-all ${
                  isMatched
                    ? "border-emerald-400 bg-emerald-50 text-emerald-600 cursor-default shadow-sm"
                    : isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                      : "border-blue-200 bg-white hover:border-blue-400 hover:shadow-lg"
                }`}
              >
                <span>{item.left}</span>
                {isMatched && <span className="text-sm">✓</span>}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 rounded-[28px] bg-gradient-to-b from-amber-50 to-white p-4 sm:p-6 shadow-inner">
          <div className="mb-3 flex items-center justify-center gap-2 font-semibold">
            
            <h3 className="text-lg">Nghĩa tiếng Việt</h3>
          </div>
          {shuffledRight.map((item) => {
            const isSelected = rightSelection === item.id;
            const isMatched = matched.has(item.id);
            return (
              <button
                key={`right-${item.id}`}
                onClick={() => handleRightClick(item.id)}
                disabled={isMatched}
                className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-base sm:text-lg font-medium transition-all ${
                  isMatched
                    ? "border-emerald-400 bg-emerald-50 text-emerald-600 cursor-default shadow-sm"
                    : isSelected
                      ? "border-amber-500 bg-amber-200"
                      : "border-amber-200 bg-white hover:border-amber-400 hover:shadow-lg"
                }`}
              >
                {item.right}
              </button>
            );
          })}
        </div>
      </div>

     
      </div>
    </section>
  );
}
