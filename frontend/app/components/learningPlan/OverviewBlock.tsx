"use client";
import { OverviewSection } from "../../constants/types";

export default function OverviewBlock({ title, learningTitle, overview }: {
  title: string;
  learningTitle: string;
  overview: OverviewSection[];
}) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow border mb-8">
      <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
        {title}
      </h1>

      <div className="space-y-6 text-gray-800" >
        {overview.map((sec) => (
          <div key={sec.id}>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>{sec.icon}</span> {sec.title}
            </h3>

            {sec.items && (
              <ul className="list-disc pl-6 space-y-1 mt-2">
                {sec.items.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-300" />

      <h2 className="text-2xl font-bold text-blue-700">
        📘 {learningTitle}
      </h2>
    </div>
  );
}
