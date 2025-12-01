"use client";
import { LessonBlock } from "@/app/constants/types";

export default function ContentBlock({ block }: { block: LessonBlock }) {
  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm mb-3">
      <h5 className="text-blue-700 font-bold uppercase text-sm mb-2">
        {block.title}
      </h5>

      {/* LIST */}
      {block.type === "list" &&
        Array.isArray(block.dataType) &&
        block.dataType.every((i) => typeof i === "string") && (
          <ul className="list-disc pl-5 space-y-1 text-gray-800">
            {(block.dataType as string[]).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

      {/* PARAGRAPH */}
      {block.type === "paragraph" && typeof block.dataType === "string" && (
        <p className="text-gray-800 leading-relaxed">{block.dataType}</p>
      )}

      {/* AUDIO */}
      {block.type === "audio" &&
        typeof block.dataType === "object" &&
        !Array.isArray(block.dataType) &&
        "url" in block.dataType && (
          <audio controls className="w-full mt-2">
            <source src={block.dataType.url} type="audio/mpeg" />
          </audio>
        )}

       {/* HOMEWORK */}
      {block.type === "homework" &&
        Array.isArray(block.dataType) &&
        block.dataType.map((item, i) => (
          <div key={i} className="mb-2">
            {item.startsWith("http") ? (
              <a
                href={item}
                target="_blank"
                className="text-blue-600 underline hover:text-blue-800"
              >
                {item}
              </a>
            ) : (
              <p className="text-gray-800">{item}</p>
            )}
          </div>
        ))}
    </div>
  );
}
