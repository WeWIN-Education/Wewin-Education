"use client";
import { LessonBlock } from "@/app/constants/types";

export default function ContentBlock({ block }: { block: LessonBlock }) {
  const lines = block.content
    ? block.content.split("\n").map((t) => t.trim()).filter((t) => t.length > 0)
    : [];

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm mb-3">
      <h5 className="text-blue-700 font-bold uppercase text-sm mb-2">
        {block.title}
      </h5>

      {/* LIST */}
      {block.type === "list" && (
        <ul className="list-disc pl-5 space-y-1 text-gray-800 whitespace-pre-line">
          {lines.map((line, i) => (
            <li key={i}>{line.replace(/^•\s?/, "")}</li>
          ))}
        </ul>
      )}

      {/* PARAGRAPH */}
      {block.type === "paragraph" && (
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {block.content}
        </p>
      )}

      {/* AUDIO */}
      {block.type === "audio" && block.audioUrl && (
        <div className="space-y-2">
          <p className="text-gray-700 whitespace-pre-line">{block.content}</p>
          <audio controls className="w-full mt-1">
            <source src={block.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {/* HOMEWORK */}
      {block.type === "homework" && (
        <div className="space-y-2">
          {lines.map((item, i) => {
            const isLink = item.startsWith("http");

            return (
              <div key={i}>
                {isLink ? (
                  <a
                    href={item}
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {item}
                  </a>
                ) : (
                  <p className="text-gray-800">{item.replace(/^•\s?/, "")}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
