"use client";

import React from "react";
import OverviewBlock from "./OverviewBlock";
import ProjectBlock from "./projectBlock";
import { getClassDetail } from "../../constants/classDetails";
import {
  mockBooks,
  mockProjects,
  mockLearningNodes,
  mockLessonContents,
} from "../../constants/mockData";
import { ClassId } from "@/app/constants/types";

/* MAP CLASS → BOOK */
const CLASS_TO_BOOK: Record<ClassId, string> = {
  KIDS: "book_kids",
  STARTERS_FOUNDATION: "book_starters_foundation",
  // STARTERS: "book_starters",
  // MOVERS: "book_movers",
  // FLYERS: "book_flyers",
  GAMES: "book_games",
  AUDIO: "book_audio",
  VIDEOS: "book_videos",
};

export default function DetailContent({ classId }: { classId: ClassId }) {
  const detail = getClassDetail(classId);

  // 1) Map class → bookId đúng
  const mappedBookId = CLASS_TO_BOOK[classId];

  // 2) Lấy book theo class
  const book = mockBooks.find((b) => b.id === mappedBookId);

  if (!book) {
    return <div className="text-red-500">Không tìm thấy sách tương ứng.</div>;
  }

  // 3) Lấy project theo book
  const projects = mockProjects.filter((p) => p.bookId === book.id);

  return (
    <div className="animate-fadeIn">
      {/* OVERVIEW */}
      <OverviewBlock
        title={detail.title}
        learningTitle={detail.learningTitle}
        overview={detail.overview}
      />

      {/* PROJECTS */}
      <div className="bg-white p-8 rounded-2xl border shadow">
        {projects.map((project) => {
          const nodes = mockLearningNodes.filter(
            (n) => n.projectId === project.id
          );

          const lessonBlocks = mockLessonContents.filter((c) =>
            nodes.some((node) => node.id === c.learningNodeId)
          );

          return (
            <ProjectBlock
              key={project.id}
              project={project}
              nodes={nodes}
              contents={lessonBlocks}
            />
          );
        })}
      </div>
    </div>
  );
}
