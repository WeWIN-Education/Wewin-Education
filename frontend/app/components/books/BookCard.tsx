"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Book } from "../../constants/types";
import { Gamepad2, Sparkles } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();
  const imageSrc =
    book.imgUrl || "https://wewin.edu.vn/wp-content/uploads/2025/12/Logo.png";

  const handleGameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (book.gameUrl) {
      router.push(book.gameUrl);
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-200 hover:-translate-y-2">
      {/* Gradient overlay on top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none z-10" />

      {/* Image Section */}
      <div className="relative aspect-3/4 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-white">
          <Image
            src={imageSrc}
            alt={book.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            priority
          />
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4 bg-linear-to-b from-white to-blue-50/30">
        {/* Title with underline decoration */}
        <div className="text-center">
          <h3 className="font-bold text-2xl text-[#0E4BA9] mb-2 uppercase tracking-wide">
            {book.name}
          </h3>
          <div className="h-1 w-20 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mx-auto" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center leading-relaxed uppercase tracking-wide min-h-12">
          {book.description}
        </p>

        {/* Game Button */}
        <button
          type="button"
          onClick={handleGameClick}
          className="relative overflow-hidden mt-2 w-full rounded-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-white font-bold shadow-lg hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 hover:-translate-y-1 group/btn cursor-pointer"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

          {/* Button content */}
          <div className="relative flex items-center justify-center gap-2">
            <Gamepad2
              size={20}
              className="transition-transform duration-300 group-hover/btn:rotate-12"
            />
            <span className="text-base">Danh sách game</span>
            <span className="text-xl transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </div>
        </button>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Interactive
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Fun Learning
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
