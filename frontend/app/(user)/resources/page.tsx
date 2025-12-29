"use client";

import React from "react";
import BookCard from "../../components/books/BookCard";
import { mockBooks } from "../../../lib/constants/mockData";
import { Routes } from "@/lib/constants/routes";
import Link from "next/link";

const bookRoutes: Record<string, string> = {
  book_kids: Routes.RESOURCES_KIDS,
  book_starters_foundation: Routes.RESOURCES_STARTERS_FOUNDATION,
  book_starters: Routes.RESOURCES_STARTERS,
  book_movers: Routes.RESOURCES_MOVERS,
  book_flyers: Routes.RESOURCES_FLYERS,
};

const BooksPage: React.FC = () => {
  const activeBooks = mockBooks.filter((book) => book.status === "active");

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-linear-to-r from-[#0E4BA9] to-indigo-600 bg-clip-text text-transparent mb-4">
            Thư viện sách WeWIN
          </h1>
          <p className="text-gray-600 text-lg">
            Dưới đây là các tài nguyên học tập bạn có thể truy cập.
          </p>
          <div className="mt-4 h-1 w-24 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mx-auto" />
        </div>

        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeBooks.map((book) => {
            return (
              <Link 
                key={book.id} 
                href={bookRoutes[book.id]}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <BookCard book={book} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;