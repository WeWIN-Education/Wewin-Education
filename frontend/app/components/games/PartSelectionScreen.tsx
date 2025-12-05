"use client";

import Link from "next/link";
import type { UnitGameConfig, UnitGamePart } from "@/types/games";
import { DEFAULT_ENABLED_GAMES } from "@/types/games";

type PartSelectionScreenProps = {
  unit: UnitGameConfig;
  heading: string;
  onSelectPart: (partId: string) => void;
  showBreadcrumb?: boolean;
  breadcrumbBackUrl?: string;
  breadcrumbBackLabel?: string;
};

export function PartSelectionScreen({
  unit,
  heading,
  onSelectPart,
  showBreadcrumb = false,
  breadcrumbBackUrl = "/resources/kids/Games",
  breadcrumbBackLabel = "Kids Book",
}: PartSelectionScreenProps) {
  const parts = unit.parts ?? [];

  // Nếu không có parts, không hiển thị gì
  if (parts.length === 0) {
    return null;
  }

  const getGameCount = (part: UnitGamePart) => {
    return part.enabledGames?.length ?? unit.enabledGames?.length ?? DEFAULT_ENABLED_GAMES.length;
  };

  // Lấy màu background từ unit config, mặc định là màu xanh lá
  const bgColor = (unit as any).backgroundColor || "from-green-50 via-emerald-50 to-teal-50";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} p-5 pb-20`}>
      {/* Breadcrumb Navigation */}
      {showBreadcrumb && (
        <div className="pt-4 sm:pt-6 mb-4">
          <nav className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/80 shadow-md hover:shadow-lg transition-all">
            <Link
              href={breadcrumbBackUrl}
              className="flex items-center gap-1.5 sm:gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors group"
            >
              <span className="text-base sm:text-lg">📚</span>
              <span className="text-sm sm:text-base">{breadcrumbBackLabel}</span>
            </Link>
            <span className="text-gray-300 text-lg sm:text-xl">→</span>
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
              
              <span className="text-sm sm:text-base font-semibold">{heading}</span>
            </div>
          </nav>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 mt-20 sm:mt-24">
        <h1
          className="text-3xl sm:text-5xl font-bold mb-3 text-white drop-shadow-lg"
          style={{ textShadow: "0 12px 25px rgba(0,0,0,0.3)", color: "#0E4BA9" }}
        >
          {heading}
        </h1>
        {unit.name && (
          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            {unit.name}
          </p>
        )}
      </div>

      {/* Parts Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {parts.map((part, index) => {
          const gameCount = getGameCount(part);
          const gradientColors = [
            ["from-blue-500", "to-blue-400"], // Part 1 - Blue
            ["from-orange-500", "to-pink-400"], // Part 2 - Orange/Pink
            ["from-purple-500", "to-purple-400"], // Part 3+ - Purple
          ];
          const [fromColor, toColor] =
            gradientColors[index % gradientColors.length];

          return (
            <div
              key={part.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
            >
              {/* Card Content */}
              <div className="p-6 sm:p-8">
             

                {/* Description */}
               

                {/* Stats */}
              
                {/* Open Button */}
                <button
                  onClick={() => onSelectPart(part.id)}
                  className={`w-full bg-gradient-to-r ${fromColor} ${toColor} text-white font-bold py-4 px-6 rounded-2xl text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  {part.title || `Part ${index + 1}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

