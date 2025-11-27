"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen, Music } from "lucide-react";
import {
  mockProjects,
  mockLearningNodes,
  mockLessonContents,
  mockBooks,
  type LessonContent,
  type LearningNode,
  type Project,
} from "@/app/constants/mockData";

const ContentBlock = ({ data }: { data: LessonContent }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-xl border border-[#e5ebf8] shadow-sm hover:border-[#0e4ba9] transition">
      <h5 className="mb-2 text-[#0e4ba9] text-[16px] font-bold uppercase">
        {data.title}
      </h5>

      {data.content && (
        <div
          className="content-html mt-2 leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}

      {data.type === "audio" && data.mediaUrl && (
        <div className="bg-[#f1f5f9] p-3 rounded-lg mt-3">
          <Music size={16} />
          <audio controls className="w-full h-[36px] rounded-lg mt-2">
            <source src={data.mediaUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}
    </div>
  );
};

const WeekBlock = ({
  node,
  contents,
}: {
  node: LearningNode;
  contents: LessonContent[];
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const sortedContents = contents.sort((a, b) => a.order - b.order);

  return (
    <div className="mt-5 pt-3 border-t border-dashed border-[#c5d5ff]">
      {/* Header */}
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronDown /> : <ChevronRight />}
        <h4 className="text-[18px] font-semibold text-[#1a1a1a]">
          {node.title}
        </h4>
      </div>

      {isExpanded && (
        <div>
          {sortedContents.map((c) => (
            <ContentBlock key={c.id} data={c} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProjectBlock = ({
  project,
  nodes,
  allContents,
}: {
  project: Project;
  nodes: LearningNode[];
  allContents: LessonContent[];
}) => {
  const sortedNodes = nodes.sort((a, b) => a.order - b.order);

  return (
    <div
      className="mt-6 mb-8 p-6 rounded-2xl bg-[#f9fbff] border border-[#d7e3ff]"
      id={`project-${project.id}`}
    >
      <h3 className="flex items-center gap-2 text-[20px] font-bold text-[#0e4ba9]">
        <BookOpen size={24} /> {project.name}
      </h3>
      <p className="text-blue-600 italic mt-1">{project.description}</p>

      <div className="mt-4">
        {sortedNodes.map((node) => {
          const contents = allContents.filter(
            (c) => c.learningNodeId === node.id
          );
          return (
            <WeekBlock key={node.id} node={node} contents={contents} />
          );
        })}
      </div>
    </div>
  );
};

export default function DetailContent({ classId }: { classId: string }) {
  const book = mockBooks[0];
  const projects = mockProjects.filter((p) => p.bookId === book.id);

  return (
    <div className="bg-white p-[35px] rounded-[24px] border border-[#e4eaf3] shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
      {projects.map((project) => {
        const nodes = mockLearningNodes.filter(
          (n) => n.projectId === project.id
        );
        return (
          <ProjectBlock
            key={project.id}
            project={project}
            nodes={nodes}
            allContents={mockLessonContents}
          />
        );
      })}
    </div>
  );
}
