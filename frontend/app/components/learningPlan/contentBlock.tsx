"use client";
import { LessonBlock } from "@/lib/constants/types";

export default function ContentBlock({ block }: { block: LessonBlock }) {
  const lines = block.content
    ? block.content
        .split("\n")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm mb-3 wrap-break-word">
      <div className="text-blue-700 font-bold uppercase text-xs md:text-lg mb-2 wrap-break-word">
        {block.title}
      </div>

      {/* LIST */}
      {block.type === "list" && (
        <ul className="list-disc pl-5 space-y-1 text-gray-800 whitespace-pre-line wrap-break-word">
          {lines.map((line, i) => (
            <li key={i} className="wrap-break-word text-xs md:text-lg">
              {line.replace(/^•\s?/, "")}
            </li>
          ))}
        </ul>
      )}

      {/* PARAGRAPH */}
      {block.type === "paragraph" && (
        <p className="text-gray-800 leading-relaxed whitespace-pre-line wrap-break-word">
          {block.content}
        </p>
      )}

      {/* AUDIO */}
      {block.type === "audio" && block.audioUrl && (
        <div className="space-y-2 wrap-break-word">
          <p className="text-gray-700 whitespace-pre-line wrap-break-word">
            {block.content}
          </p>
          <audio controls className="w-full mt-1">
            <source src={block.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {/* HOMEWORK */}
      {block.type === "homework" && (
        <div className="space-y-2 wrap-break-word">
          {/* Render text + links */}
          {lines.map((item, i) => {
            const isLink = item.startsWith("http");
            return (
              <div key={i}>
                {isLink ? (
                  <a
                    href={item}
                    target="_blank"
                    className="text-blue-600 underline hover:text-blue-800 break-all"
                  >
                    {item}
                  </a>
                ) : (
                  <p className="text-gray-800">{item.replace(/^•\s?/, "")}</p>
                )}
              </div>
            );
          })}

          {/* NEW: render multiple audio files if any */}
          {block.audioUrl && (
            <div className="mt-2 space-y-3">
              {block.audioUrl
                .split("\n")
                .map((x) => x.trim())
                .filter((x) => x.length > 0)
                .map((url, index) => (
                  <audio key={index} controls className="w-full">
                    <source src={url} type="audio/mpeg" />
                  </audio>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
