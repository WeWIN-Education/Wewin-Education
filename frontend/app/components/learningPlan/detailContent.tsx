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

const CLASS_TO_BOOK: Record<ClassId, string> = {
  KIDS: "book_kids",
  STARTERS_FOUNDATION: "book_starters_foundation",
  GAMES: "book_games",
  AUDIO: "book_audio",
  VIDEOS: "book_videos",
};

export default function DetailContent({ classId }: { classId: ClassId }) {
  const detail = getClassDetail(classId);
  const mappedBookId = CLASS_TO_BOOK[classId];
  const book = mockBooks.find((b) => b.id === mappedBookId);

  if (!book) {
    return (
      <div className="text-red-500 text-center p-4">
        Không tìm thấy sách tương ứng.
      </div>
    );
  }

  const projects = mockProjects.filter((p) => p.bookId === book.id);

  return (
  <div className="w-full max-w-full overflow-hidden">
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow w-full max-w-full">
      <OverviewBlock
        title={detail.title}
        learningTitle={detail.learningTitle}
        overview={detail.overview}
      />

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
