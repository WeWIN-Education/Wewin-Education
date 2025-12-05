"use client";

import { useState, useEffect } from "react";

type PlayerIdModalProps = {
  isOpen: boolean;
  onSubmit: (playerId: string) => void;
  onSkip: () => void;
};

export function PlayerIdModal({ isOpen, onSubmit, onSkip }: PlayerIdModalProps) {
  const [playerId, setPlayerId] = useState("");
  const [mounted, setMounted] = useState(false);

  // Chỉ render sau khi component đã mount trên client để tránh hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      setPlayerId("");
    }
  }, [isOpen, mounted]);

  const handleSubmit = () => {
    onSubmit(playerId.trim() || "anonymous");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Không render gì cả cho đến khi đã mount trên client
  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[3000] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-blue-500 mb-4 sm:mb-5 text-2xl sm:text-3xl font-bold">🎮 Nhập ID Người Chơi</h2>
        <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
          Vui lòng nhập ID của bạn để lưu điểm và tiến độ
        </p>
        <div className="mb-5 sm:mb-6">
          <input
            type="text"
            color="black"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập ID của bạn..."
            maxLength={50}
            className="text-black w-full p-3 sm:p-4 border-2 border-gray-300 rounded-2xl text-base sm:text-lg text-center focus:outline-none focus:border-blue-500"
            autoFocus
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-2xl text-base sm:text-lg font-bold hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Xác nhận
          </button>
          <button
            onClick={onSkip}
            className="bg-gray-200 text-gray-600 px-6 sm:px-8 py-3 rounded-2xl text-base sm:text-lg font-bold hover:bg-gray-300 transition w-full sm:w-auto"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    </div>
  );
}

