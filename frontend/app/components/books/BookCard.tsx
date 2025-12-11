"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "../../constants/types";
interface BookCardProps {
  book: Book;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const imageSrc =
    book.imgUrl || "https://wewin.edu.vn/wp-content/uploads/2025/12/Logo.png";
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="aspect-3/4 relative bg-gray-200">
        <Image
          src={imageSrc}
          alt={book.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-2xl text-[#0E4BA9] text-center">
          {book.name}
        </h3>
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          {book.description}
        </p>
        <Link
          href={book.gameUrl || "#"}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <span>Danh sách game</span>
          <span className="text-lg">→</span>
        </Link>
      </div>   
    </div>
  );
};
export default BookCard;
