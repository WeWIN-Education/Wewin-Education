"use client";

import WeekBlock from "./weekBlock";
import { Project, LearningNode, LessonBlock } from "../../constants/types";

export default function ProjectBlock({
  project,
  nodes,
  contents,
}: {
  project: Project;
  nodes: LearningNode[];
  contents: LessonBlock[];
}) {
  const sortedNodes = [...nodes].sort((a, b) => a.order - b.order);

  return (
    <div
      id={`project-${project.id}`}
      className="bg-[#f9fbff] border border-[#d7e3ff] p-6 rounded-2xl mt-8"
    >
      <h3 className="text-[20px] font-bold text-[#0e4ba9] flex items-center gap-2">
        📘 {project.name}
      </h3>

      <p className="text-blue-600 italic mt-1">{project.description}</p>

      <div className="mt-4">
        {sortedNodes.map((node) => (
          <WeekBlock
            key={node.id}
            node={node}
            contents={contents.filter(
              (c: LessonBlock) => c.learningNodeId === node.id
            )}
          />
        ))}
      </div>
    </div>
  );
}
