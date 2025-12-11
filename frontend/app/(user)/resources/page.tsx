"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Gamepad2 } from "lucide-react";
import { Routes } from "@/app/constants/routes";

type BookCard = {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  gameLink: string;
  color: string;
  cardBg: string;
};

export default function ResourcesPage() {
  const books: BookCard[] = [
    {
      id: "kids",
      name: "Kids Book",
      description:
        "Tài liệu thân thiện cho bé, nhiều hoạt động tương tác và trò chơi từ vựng để khởi đầu tự tin.",
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-pink-600" />,
      gameLink: Routes.RESOURCES_GAMES,
      color: "from-pink-500 to-rose-500",
      cardBg: "from-pink-50 via-white to-rose-50",
    },
    {
      id: "mover",
      name: "Mover Book",
      description:
        "Nâng cao kỹ năng với bài tập thử thách, vốn từ vựng rộng và trò chơi hấp dẫn.",
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-600" />,
      gameLink: "/resources/mover/Games",
      color: "from-green-500 to-emerald-500",
      cardBg: "from-emerald-50 via-white to-green-50",
    },
    {
      id: "flyer",
      name: "Flyer Book",
      description:
        "Nội dung nâng cao cho người học giỏi: luyện từ vựng, ngữ pháp phức tạp và trò chơi luyện tập.",
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-600" />,
      gameLink: "/resources/flyer/Games",
      color: "from-blue-500 to-indigo-500",
      cardBg: "from-indigo-50 via-white to-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14 px-4 sm:px-6">
        {books.map((book) => (
          <section key={book.id} className="space-y-6 sm:space-y-8">
            {/* Khung 1: Header */}
            <div
              className={`w-full rounded-2xl bg-gradient-to-r ${book.color} shadow-md px-6 sm:px-8 py-5 sm:py-6`}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-sm">
                {book.name}
              </h2>
            </div>

            {/* Khung 2: Hình + Tóm tắt */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100/80 p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                {/* Hình sách */}
                <div
                  className={`bg-gradient-to-br ${book.cardBg} rounded-2xl border border-gray-200/80 p-8 sm:p-10 flex items-center justify-center`}
                >
                  <div className="text-center space-y-4 sm:space-y-5">
                    <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/80 shadow-inner flex items-center justify-center">
                      {book.icon}
                    </div>
                    <div
                      className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${book.color} bg-clip-text text-transparent`}
                    >
                      {book.name}
                    </div>
                  </div>
                </div>

                {/* Tóm tắt */}
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    About This Book
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold border border-blue-100">
                      Interactive Learning
                    </span>
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs sm:text-sm font-semibold border border-green-100">
                      Vocabulary Games
                    </span>
                    <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-semibold border border-purple-100">
                      Progress Tracking
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Khung 3: Link Game */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${book.color} rounded-xl flex items-center justify-center text-white shadow-md`}
                >
                  <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Play Games</p>
                  <p className="text-sm text-gray-500">
                    Trò chơi và hoạt động cho {book.name}
                  </p>
                </div>
              </div>
              <Link
                href={book.gameLink}
                className={`w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r ${book.color} text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-center`}
              >
                Start Playing →
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

