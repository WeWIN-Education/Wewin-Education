"use client";
import { LessonBlock } from "../../constants/types";

export default function ContentBlock({ block }: { block: LessonBlock }) {

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm mb-3">
      <h5 className="text-blue-700 font-bold uppercase text-sm mb-2">
        {block.title}
      </h5>

      {/* LIST */}
      {block.type === "list" && Array.isArray(block.data) && (
        <ul className="list-disc pl-5 space-y-1 text-gray-800">
          {block.data.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {/* PARAGRAPH */}
      {block.type === "paragraph" && typeof block.data === "string" && (
        <p className="text-gray-800 leading-relaxed">{block.data}</p>
      )}

      {/* AUDIO – type guard */}
      {block.type === "audio" &&
        typeof block.data === "object" &&
        "url" in block.data && (
          <audio controls className="w-full mt-2">
            <source src={block.data.url} type="audio/mpeg" />
          </audio>
      )}
    </div>
  );
}
