"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PronunciationGameConfig } from "@/types/games";

type Props = PronunciationGameConfig & {
  onComplete?: (score: number) => void;
};

type SpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
};

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function PronunciationGame({ title, words, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [status, setStatus] = useState("Nhấn 'Nghe từ' để bắt đầu nhé! 🎧");
  const [statusType, setStatusType] = useState<"info" | "correct" | "warning">("info");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [completed, setCompleted] = useState(false);
  const kidResultMessage = ({
    isCorrect,
    similarity,
    spoken,
    correct,
  }: {
    isCorrect: boolean;
    similarity: number;
    spoken: string;
    correct: string;
  }) => {
    if (isCorrect) {
      if (similarity >= 0.9) {
        return `
  🎉 Tuyệt vời quá!
  Con đọc CHUẨN luôn rồi đó 🥳
  
  👂 Từ con đọc:
  "${correct}"
  
  ⭐ Cô rất tự hào về con!
  ➡️ Mình sang từ tiếp theo nhé!
  `;
      }
  
      if (similarity >= 0.75) {
        return `
  🌟 Rất tốt!
  Con đọc gần đúng rồi đó 👏
  
  👂 Con đọc:
  "${spoken}"
  
  👉 Chỉ cần đọc rõ hơn một chút:
  ${kidSyllableHint(correct)}
  
  💪 Con làm được mà!
  `;
      }
  
      return `
  👍 Tốt lắm!
  Con đọc đúng phần lớn rồi đó 😊
  
  👉 Cùng đọc lại cho rõ hơn nhé:
  ${kidSyllableHint(correct)}
  
  🗣️ Đọc chậm từng khúc nha!
  `;
    }
  
    // ❌ TRƯỜNG HỢP SAI
    if (similarity >= 0.5) {
      return `
  😊 Con cố gắng rất tốt rồi!
  
  👂 Con đã đọc đúng một phần,
  nhưng còn thiếu hoặc sai một khúc nhỏ thôi.
  
  👉 Cùng cô đọc lại nhé:
  ${kidSyllableHint(correct)}
  
  🗣️ Chậm – rõ – từng khúc nha!
  `;
    }
  
    return `
  🤗 Không sao cả!
  Từ này hơi khó một chút nè.
  
  👉 Mình nghe lại và đọc từng khúc nhé:
  ${kidSyllableHint(correct)}
  
  🌈 Cô tin là con sẽ làm được!
  `;
  };
  
  const currentWord = words[currentIndex];
  const progress = useMemo(
    () => ((currentIndex + 1) / words.length) * 100,
    [currentIndex, words.length],
  );
  const kidSyllableHint = (word: string) => {
    return word
      .replace(/([aeiouy]+)/gi, "-$1-")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "")
      .toUpperCase()
      .split("-")
      .join(" – ");
  };
  const kidFriendlyFeedback = (
    spoken: string,
    correct: string,
    similarity: number
  ) => {
    if (similarity >= 0.75) {
      return "🎉 Con đọc gần đúng rồi đó! Chỉ cần đọc rõ hơn một chút nữa thôi!";
    }
  
    if (similarity >= 0.5) {
      return "😊 Con đọc đúng một phần rồi, nhưng còn thiếu hoặc sai một khúc nhỏ.";
    }
  
    return "💡 Con thử đọc chậm hơn và đọc từng khúc nhé!";
  };
    
  useEffect(() => {
    // Kiểm tra hỗ trợ Speech Recognition
    if (
      "webkitSpeechRecognition" in window ||
      "SpeechRecognition" in window
    ) {
      setIsSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 5;
        

      recognition.onstart = () => {
        setIsRecording(true);
        setStatus("Hãy đọc to và rõ ràng nhé! 🗣️");
        setStatusType("info");
      };

      recognition.onresult = (event: any) => {
        const alternatives = Array.from(event.results[0]).map(
          (r: any) => r.transcript.toLowerCase().trim()
        );
      
        const cleanCorrect = currentWord.text.toLowerCase();
      
        let bestTranscript = alternatives[0];
        let bestScore = 0;
      
        for (const alt of alternatives) {
          const sim = calculateSimilarity(
            alt.replace(/[^\w\s]/g, ""),
            cleanCorrect
          );
          if (sim > bestScore) {
            bestScore = sim;
            bestTranscript = alt;
          }
        }
      
        // 🚫 KHÔNG HIỂN THỊ "MÁY NGHE"
        // 🚫 KHÔNG RETURN
        // 👉 COI NHƯ TRẺ ĐỌC SAI → ĐƯA VÀO FEEDBACK CHO TRẺ
      
        checkPronunciation(bestTranscript, cleanCorrect);
      };
      
      recognition.onerror = () => {
        setStatus("Không nghe rõ. Bạn thử lại nhé!");
        setStatusType("warning");
        stopRecording();
      };

      recognition.onend = () => {
        stopRecording();
      };

      recognitionRef.current = recognition;
    }
  }, [currentWord.text]);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const calculateSimilarity = useCallback((a: string, b: string): number => {
    if (!a || !b) return 0;
    if (a === b) return 1;

    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;
    const longerLength = longer.length;

    // Levenshtein distance
    const matrix: number[][] = Array.from({ length: shorter.length + 1 }, () =>
      Array(longer.length + 1).fill(0),
    );

    for (let i = 0; i <= shorter.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= longer.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= shorter.length; i++) {
      for (let j = 1; j <= longer.length; j++) {
        if (shorter.charAt(i - 1) === longer.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1,
          );
        }
      }
    }

    const distance = matrix[shorter.length][longer.length];
    return (longerLength - distance) / longerLength;
  }, []);
  const analyzePronunciation = (
    transcript: string,
    correctWord: string,
    similarity: number,
  ) => {
    const a = transcript;
    const b = correctWord;
  
    if (a === b) {
      return "Phát âm trùng khớp hoàn toàn 🎯";
    }
  
    if (b.includes(a)) {
      return `Bạn đọc thiếu âm. Từ đúng có thêm "${b.replace(a, "")}"`;
    }
  
    if (a.includes(b)) {
      return `Bạn đọc dư âm "${a.replace(b, "")}"`;
    }
  
    // tìm ký tự sai
    let diffs: string[] = [];
    const maxLen = Math.max(a.length, b.length);
  
    for (let i = 0; i < maxLen; i++) {
      if (a[i] !== b[i]) {
        diffs.push(`vị trí ${i + 1}: "${a[i] || "_"}" ≠ "${b[i] || "_"}"`);
      }
    }
  
    return diffs.length
      ? `Khác nhau tại ${diffs.slice(0, 2).join(", ")}`
      : "Phát âm gần đúng";
  };
  
  const checkPronunciation = useCallback(
    (transcript: string, correctWord: string) => {
      const cleanTranscript = transcript.replace(/[^\w\s]/g, "").trim().toLowerCase();
      const cleanCorrect = correctWord.toLowerCase();
  
      const similarity = calculateSimilarity(cleanTranscript, cleanCorrect);
      const analysis = analyzePronunciation(
        cleanTranscript,
        cleanCorrect,
        similarity,
      );
  
      const isPerfect = cleanTranscript === cleanCorrect;
      const isVeryGood = similarity >= 0.8;
      const isGood = similarity >= 0.6;
      const isCorrect = isPerfect || isVeryGood || isGood;
  
      if (isCorrect) {
        let pointsEarned = 0;
        let rating = "";
  
        if (isPerfect) {
          pointsEarned = 15;
          rating = "🎯 Hoàn hảo";
        } else if (isVeryGood) {
          pointsEarned = 12;
          rating = "🌟 Rất tốt";
        } else {
          pointsEarned = 10;
          rating = "👍 Tốt";
        }
  
        setScore((prev) => prev + pointsEarned);
        setCorrectCount((prev) => prev + 1);
        setStatusType("correct");
  
        const message = kidResultMessage({
          isCorrect,
          similarity,
          spoken: cleanTranscript,
          correct: cleanCorrect,
        });
        
        if (isCorrect) {
          let pointsEarned = similarity >= 0.9 ? 15 : similarity >= 0.75 ? 12 : 10;
        
          setScore((prev) => prev + pointsEarned);
          setCorrectCount((prev) => prev + 1);
          setStatusType("correct");
        
          setStatus(message + `\n⭐ +${pointsEarned} điểm`);
        } else {
          setScore((prev) => Math.max(0, prev - 3));
          setStatusType("warning");
        
          setStatus(message + `\n💡 Con thử lại nhé!`);
        }
        
          
      }
    },
    [score, calculateSimilarity],
  );
  

  const handleListen = useCallback(() => {
    if (isSpeaking) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentWord.text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setStatus("Lắng nghe thật kỹ nhé! 👂");
        setStatusType("info");
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setStatus("Nhấn 'Ghi âm' và đọc theo nào!");
        setStatusType("info");
      };

      window.speechSynthesis.speak(utterance);
    }
  }, [currentWord.text, isSpeaking]);

  const handleRecord = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      alert("Trình duyệt của bạn chưa hỗ trợ ghi âm. Hãy dùng Chrome hoặc Edge nhé!");
      return;
    }

    if (isSpeaking) {
      setStatus("Đợi phát âm xong rồi ghi nhé! ⏳");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        setStatus("Không thể bắt đầu ghi âm. Bạn thử lại nhé!");
        setStatusType("warning");
        stopRecording();
      }
    }
  }, [isSupported, isSpeaking, isRecording, stopRecording]);

  const handleNext = useCallback(() => {
    if (currentIndex >= words.length - 1) {
      setStatus(`🎉 Xuất sắc! Bạn đã hoàn thành tất cả các từ! Tổng điểm: ${score} điểm`);
      setStatusType("correct");
      if (!completed) {
        setCompleted(true);
        onComplete?.(score);
      }
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setStatus("Nhấn 'Nghe từ' để tiếp tục học từ mới!");
    setStatusType("info");
  }, [completed, currentIndex, onComplete, score, words.length]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStatus("Nhấn 'Nghe từ' để bắt đầu nhé! 🎧");
    setStatusType("info");
    setCompleted(false);
  }, []);

  return (
    <section className="min-h-screen bg-blue-50 bg-fixed py-8 sm:py-10 px-3 sm:px-4 md:px-6">
      <div className="rounded-2xl border border-blue-100 bg-white/95 p-4 sm:p-6 shadow-xl max-w-5xl mx-auto">
      <header className="text-center">
      
        <h2 className="text-xl sm:text-2xl font-semibold text-blue-900">{title}</h2>
      </header>

      {!isSupported && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-center text-sm sm:text-base text-red-700">
          ⚠️ Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome hoặc Edge nhé!
        </div>
      )}

      <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm sm:text-base text-yellow-800">
        <p className="font-semibold">📝 Cách chơi:</p>
        <ol className="mt-2 list-decimal list-inside space-y-1">
          <li>Nhấn "Nghe từ" để nghe phát âm chuẩn.</li>
          <li>Nhấn "Ghi âm" và đọc theo.</li>
          <li>Nhận phản hồi và chuyển sang từ mới!</li>
        </ol>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-4 rounded-xl bg-white p-4 shadow-sm">
        <div className="flex-1 text-center">
          <div className="text-sm sm:text-base text-blue-600">⭐ Điểm</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900">{score}</div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm sm:text-base text-blue-600">📚 Từ</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900">
            {currentIndex + 1}/{words.length}
          </div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-sm sm:text-base text-blue-600">✅ Đúng</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-900">{correctCount}</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 sm:p-8 text-center text-white shadow-lg">
        <div className="text-5xl sm:text-7xl mb-4">{currentWord.emoji || "📝"}</div>
        <div className="text-3xl sm:text-4xl font-bold mb-2 capitalize">
          {currentWord.text}
        </div>
        {currentWord.meaning && (
          <div className="text-lg sm:text-xl bg-white/25 rounded-lg px-4 py-2 inline-block">
            {currentWord.meaning}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleListen}
          disabled={isSpeaking}
          className={`rounded-xl px-6 py-3 font-bold text-white transition ${
            isSpeaking
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 hover:shadow-lg"
          } w-full sm:w-auto`}
        >
          🔊 Nghe từ
        </button>
        <button
          onClick={handleRecord}
          disabled={!isSupported || isSpeaking}
          className={`rounded-xl px-6 py-3 font-bold text-white transition ${
            isRecording
              ? "bg-red-600 animate-pulse"
              : isSpeaking || !isSupported
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
          } w-full sm:w-auto`}
        >
          {isRecording ? "⏹️ Dừng ghi" : "🎤 Ghi âm"}
        </button>
        <button
          onClick={currentIndex >= words.length - 1 ? handleReset : handleNext}
          className="rounded-xl bg-blue-500 px-6 py-3 font-bold text-white transition hover:bg-blue-600 hover:shadow-lg w-full sm:w-auto"
        >
          {currentIndex >= words.length - 1 ? "🔄 Chơi lại" : "➡️ Từ tiếp theo"}
        </button>
      </div>

      <div
        className={`mt-6 rounded-xl p-4 text-center text-base sm:text-lg font-bold ${
          statusType === "correct"
            ? "bg-green-100 text-green-800"
            : statusType === "warning"
              ? "bg-orange-100 text-orange-800"
              : "bg-blue-100 text-blue-800"
        }`}
      >
        {status}
      </div>

      <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      </div>
    </section>
  );
}

