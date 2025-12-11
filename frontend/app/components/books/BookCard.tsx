"use client";
import React from "react";
import Image from "next/image";
import { Book } from "../../constants/types";
interface BookCardProps {
  book: Book;
}
const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const imageSrc =
    book.imgUrl || "https://wewin.edu.vn/wp-content/uploads/2025/12/Logo.png";
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
      <div className="p-4">
        <h3 className="font-semibold text-2xl mb-2 text-[#0E4BA9] text-center">
          {book.name}
        </h3>
        <p className="text-sm text-gray-600">{book.description}</p>
      </div>
    </div>
  );
};
export default BookCard;
