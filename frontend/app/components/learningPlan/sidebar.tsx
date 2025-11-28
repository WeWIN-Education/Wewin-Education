"use client";

import React from "react";
import { mockProjects, mockBooks } from "@/app/constants/mockData";

export default function Sidebar({ classId }: { classId: string }) {
  const book = mockBooks[0];
  const projects = mockProjects.filter((p) => p.bookId === book.id);

  return (
    <div className="sticky top-5 max-h-[calc(100vh-40px)] overflow-y-auto
      p-5 bg-white rounded-xl shadow-[0_6px_16px_rgba(0,0,0,0.08)] hidden md:block"
    >
      <h3 className="text-[18px] text-[#0e4ba9] font-bold mb-4">
        📌 Giai đoạn
      </h3>

      <div className="flex flex-col">
        {projects.map((project) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className="px-3 py-2 mb-2 bg-[#f0f5ff] rounded-lg text-[#0e4ba9] 
              font-medium text-[14px] hover:bg-[#0e4ba9] hover:text-white transition"
          >
            {project.name}
          </a>
        ))}
      </div>
    </div>
  );
}
