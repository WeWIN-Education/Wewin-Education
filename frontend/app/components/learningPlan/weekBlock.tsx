"use client";

import { useState } from "react";
import ContentBlock from "./contentBlock";
import { LearningNode, LessonBlock } from "../../constants/types";

export default function WeekBlock({
  node,
  contents,
}: {
  node: LearningNode;
  contents: LessonBlock[];
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const sorted = [...contents].sort((a, b) => a.order - b.order);

  return (
    <div className="mt-6 pt-4 border-t border-dashed border-[#c5d5ff]">
      {/* HEADER */}
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm text-gray-800">{isExpanded ? "▼" : "▶"}</span>
        <h4 className="text-sm md:text-2xl font-semibold text-[#1a1a1a]">
          {node.title}
        </h4>
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div>
          {sorted.map((block: LessonBlock) => (
            <ContentBlock key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}
