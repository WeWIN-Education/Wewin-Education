"use client";

import React from "react";
import BookCard from "../../components/books/BookCard";
import { mockBooks } from "../../constants/mockData";
import { Routes } from "@/app/constants/routes";
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0E4BA9] mb-4">
            Thư viện sách WeWIN
          </h1>
          <p className="text-gray-600 text-lg">
            Dưới đây là các tài nguyên học tập bạn có thể truy cập.
          </p>
        </div>

        {/* Grid Layout - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeBooks.map((book) => {
            return (
              <div key={book.id} className="flex flex-col gap-6">
                {/* Book Section */}
                <Link href={bookRoutes[book.id]}>
                  <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                    <BookCard book={book} />
                  </div>
                </Link>

                {/* Games Section */}
                {/* <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">
                    Games & Activities
                  </h3>
                  {book.games && book.games.length > 0 ? (
                    <GamesSection games={book.games} />
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      Coming soon...
                    </p>
                  )}
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
