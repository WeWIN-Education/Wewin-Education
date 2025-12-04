"use client";
import { OverviewSection } from "../../constants/types";

export default function OverviewBlock({ title, learningTitle, overview }: {
  title: string;
  learningTitle: string;
  overview: OverviewSection[];
}) {
  return (
    <div className="w-full">
      {/* Title - Responsive */}
      <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-4 md:mb-6 wrap-break-word">
        {title}
      </h1>

      {/* Overview Content - Responsive */}
      <div className="space-y-4 md:space-y-6 text-gray-800">
        {overview.map((sec) => (
          <div key={sec.id} className="w-full">
            <h3 className="text-sm sm:text-base md:text-lg font-bold flex items-start gap-2 mb-2">
              <span className="text-base sm:text-lg md:text-xl">{sec.icon}</span>
              <span className="wrap-break-word">{sec.title}</span>
            </h3>

            {sec.items && (
              <ul className="list-disc pl-5 sm:pl-6 md:pl-7 space-y-1.5 mt-2 text-xs sm:text-sm md:text-base">
                {sec.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700 leading-relaxed wrap-break-word">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-6 md:my-8 border-gray-300" />

      {/* Learning Title - Responsive */}
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-3 md:mb-4 text-center wrap-break-word">
        📘 {learningTitle}
      </h2>

      <hr className="my-6 md:my-8 border-gray-300" />
    </div>
  );
}