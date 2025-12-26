"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Book } from "../../constants/types";
import { Gamepad2 } from "lucide-react";

interface GameCardProps {
  book: Book;
}

const GameCard: React.FC<GameCardProps> = ({ book }) => {
  const imageSrc =
    book.imgUrl || "https://wewin.edu.vn/wp-content/uploads/2025/12/Logo.png";

  return (
    <Link 
      href={book.gameUrl || "#"}
      className="block group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-2 cursor-pointer"
    >
      {/* Gradient overlay on top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none z-10" />

      {/* Floating game icon */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
        <Gamepad2 className="w-6 h-6 text-indigo-600" />
      </div>

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
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col gap-4 bg-linear-to-b from-white to-blue-50/50">
        {/* Title with underline decoration */}
        <div className="text-center">
          <h3 className="font-bold text-2xl text-[#0E4BA9] mb-2 uppercase tracking-wide group-hover:text-indigo-600 transition-colors">
            {book.name}
          </h3>
          <div className="h-1 w-20 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mx-auto group-hover:w-28 transition-all duration-300" />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 text-center leading-relaxed uppercase tracking-wide min-h-12">
          {book.description}
        </p>

        {/* Click hint */}
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-semibold py-2 rounded-full bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
          <span className="text-lg">🎮</span>
          <span>Bấm để chơi game</span>
          <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
        </div>

      
      </div>
    </Link>
  );
};

export default GameCard;

