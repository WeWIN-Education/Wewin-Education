"use client";

import React, { useState, useEffect } from "react";
import { mockProjects} from "@/lib/constants/mockData";
import { ClassId } from "@/lib/constants/types";

const CLASS_TO_BOOK: Record<ClassId, string> = {
  KIDS: "book_kids",
  STARTERS_FOUNDATION: "book_starters_foundation",
  STARTERS: "book_starters",
  MOVERS: "book_movers",
  FLYERS: "book_flyers",
  AUDIO: "book_audio",
  VIDEOS: "book_videos",
};

export default function Sidebar({ classId }: { classId: ClassId }) {
  const mappedBookId  = CLASS_TO_BOOK[classId];
  const projects = mockProjects.filter((p) => p.bookId === mappedBookId );
  const [activeSection, setActiveSection] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false); // Đóng sidebar sau khi click
    } 
  };

  return (
    <>
      {/* Button toggle cho mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#0e4ba9] text-white rounded-full shadow-lg hover:bg-[#0a3a7f] transition-colors duration-200"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar for mobile/tablet (overlay) */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h3 className="text-[18px] text-[#0e4ba9] font-bold mb-4 mt-8">
            📌 Giai đoạn
          </h3>

          <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-120px)]">
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
      </div>
    </>
  );
}