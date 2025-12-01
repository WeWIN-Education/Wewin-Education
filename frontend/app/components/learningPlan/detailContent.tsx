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

export default function DetailContent({ classId }: { classId: string }) {
  const detail = getClassDetail(classId as ClassId);

  // load mock book
  const book = mockBooks.find((b) => b.id === "book_kids");

  // filter projects belonging to book
  const projects = mockProjects.filter((p) => p.bookId === book?.id);

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

          return (
            <ProjectBlock
              key={project.id}
              project={project}
              nodes={nodes}
              contents={mockLessonContents}
            />
          );
        })}
      </div>
    </div>
  );
}
