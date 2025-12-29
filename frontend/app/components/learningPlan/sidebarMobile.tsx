"use client";

import React from "react";
import { mockProjects, mockBooks } from "@/lib/constants/mockData";

interface SidebarMobileProps {
  classId: string; // gán kiểu string hoặc kiểu union nếu bạn có nhiều classId cụ thể
}

export default function SidebarMobile({ classId }: SidebarMobileProps) {
  const book = mockBooks[0];
  const projects = mockProjects.filter((p) => p.bookId === book.id);

  return (
    <div className="mobile-sidebar md:hidden hidden fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-[#0e4ba9]">
          📌 Mục lục sách
        </span>
        <button className="text-xl">✕</button>
      </div>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id}>
            <a
              href={`#project-${project.id}`}
              className="text-[#0e4ba9] font-medium"
            >
              {project.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
