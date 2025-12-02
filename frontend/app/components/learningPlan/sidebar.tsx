"use client";

import React, { useState, useEffect } from "react";
import { mockProjects, mockBooks } from "@/app/constants/mockData";

export default function Sidebar({ classId }: { classId: string }) {
  const book = mockBooks[0];
  const projects = mockProjects.filter((p) => p.bookId === book.id);
  const [activeSection, setActiveSection] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      const sections = projects.map((p) => document.getElementById(`project-${p.id}`));
      const scrollPosition = newScrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`project-${projects[i].id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, projectId: string) => {
    e.preventDefault();
    const element = document.getElementById(`project-${projectId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="hidden md:block absolute top-20 right-[max(calc(50vw-660px),24px)] w-[300px]
    max-h-[calc(100vh-120px)] overflow-y-auto
    p-5 bg-white rounded-xl shadow"
      style={{
        transform: `translateY(${scrollY}px)`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      <h3 className="text-[18px] text-[#0e4ba9] font-bold mb-4">
        📌 Giai đoạn
      </h3>

      <div className="flex flex-col">
        {projects.map((project) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className={`px-3 py-2 mb-2 rounded-lg text-[#0e4ba9] font-medium text-[14px] transition ${
              activeSection === `project-${project.id}`
                ? "bg-[#0e4ba9] text-white"
                : "bg-[#f0f5ff] hover:bg-[#0e4ba9] hover:text-white"
            }`}
            onClick={(e) => handleClick(e, project.id)}
          >
            {project.name}
          </a>
        ))}
      </div>
    </div>
  );
}