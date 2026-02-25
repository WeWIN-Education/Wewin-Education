"use client";

import React, { useState, useEffect } from "react";
import GameCard from "../components/books/GameCard";
import { Book } from "../../lib/constants/types";

// Danh sách các sách có game - sử dụng routes PUBLIC
const gameBooks: Book[] = [
  {
    id: "game_kids",
    name: "KIDS GAMES",
    status: "active",
    imgUrl: "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "Trò chơi học tiếng Anh dành cho trẻ mầm non",
    gameUrl: "/games/kids",
  },
  {
    id: "game_starters",
    name: "STARTERS GAMES",
    status: "active",
    imgUrl: "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "Trò chơi học tiếng Anh trình độ Starters",
    gameUrl: "/games/starters",
  },
  {
    id: "game_movers",
    name: "MOVERS GAMES",
    status: "active",
    imgUrl: "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "Trò chơi học tiếng Anh trình độ Movers",
    gameUrl: "/games/movers",
  },
  {
    id: "game_flyers",
    name: "FLYERS GAMES",
    status: "active",
    imgUrl: "https://wewin.edu.vn/wp-content/uploads/2025/12/books-illustration-cartoon-books-books-vector.jpg",
    description: "Trò chơi học tiếng Anh trình độ Flyers",
    gameUrl: "/games/flyers",
  },
];

const GamesPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const activeBooks = gameBooks.filter((book) => book.status === "active");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tránh hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <span className="text-5xl">🎮</span>
              <h1 className="text-5xl font-bold bg-linear-to-r from-[#0E4BA9] to-indigo-600 bg-clip-text text-transparent">
                Thư viện Games WeWIN
              </h1>
              <span className="text-5xl">🎯</span>
            </div>
            <p className="text-gray-600 text-lg">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🎮</span>
            <h1 className="text-5xl font-bold bg-linear-to-r from-[#0E4BA9] to-indigo-600 bg-clip-text text-transparent">
              Thư viện Games WeWIN
            </h1>
            <span className="text-5xl">🎯</span>
          </div>
          <p className="text-gray-600 text-lg">
            Chọn cấp độ phù hợp để bắt đầu chơi và học tiếng Anh
          </p>
          <div className="mt-4 h-1 w-24 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mx-auto" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeBooks.map((book) => (
            <GameCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesPage;

