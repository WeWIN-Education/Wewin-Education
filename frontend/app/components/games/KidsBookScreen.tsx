"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  name: string;
};

type KidsBookScreenProps = {
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
  // Tuỳ chọn: cho phép truyền hàm render nội dung project (ví dụ: UnitGameScreen)
  renderProjectContent?: (project: Project | null) => React.ReactNode;
};

/**
 * Trang cha cho cả cuốn sách Kids Book
 * - Sidebar bên trái: danh sách Project
 * - Khu vực nội dung chính: hiển thị chào mừng hoặc nội dung theo project được chọn
 */
export function KidsBookScreen({
  projects,
  onSelectProject,
  renderProjectContent,
}: KidsBookScreenProps) {
  const router = useRouter();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedProjectId(project.id);
    onSelectProject?.(project.id);
    
    // Điều hướng đến trang riêng của unit
    router.push(`/resources/kids/Games/${project.id}`);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex min-h-screen bg-blue-50 text-blue-900">
      {/* Sidebar bên trái */}
      <aside className="flex w-72 flex-col border-r border-blue-200 bg-blue-50 shadow-xl h-screen overflow-hidden">
        <div className="flex-shrink-0 flex items-center gap-3 px-5 py-4 border-b border-blue-200/70 bg-blue-50">
          <span className="text-3xl">🌟</span>
          <div>
            <div className="text-lg font-extrabold text-blue-800 tracking-wide">
              Kids Book
            </div>
            <div className="text-xs font-medium text-blue-700">
              Chọn Project để bắt đầu
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-3 px-3">
          {projects.map((project) => {
            const isActive = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className={`w-full rounded-3xl px-4 py-4 text-left text-base font-semibold transition-all shadow-sm border ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-lg scale-[1.01]"
                    : "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {project.name}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Khu vực nội dung */}
      <main className="flex-1 flex flex-col">
        {/* Nội dung chính */}
        <div className="flex-1 relative min-h-full">
          <div className="absolute inset-0 bg-blue-50" />

{renderProjectContent ? (
            // Nếu truyền hàm render từ ngoài vào thì dùng nội dung đó (không căn giữa để cho phép scroll)
            <div className="relative w-full min-h-full">
              {renderProjectContent(selectedProject ?? null)}
            </div>
          ) : (
            // Hiển thị welcome message khi không có project nào được chọn
            <div className="relative flex h-full flex-col items-center justify-center px-6 sm:px-10 text-center">
              <div className="max-w-3xl rounded-3xl bg-white/80 shadow-xl px-6 py-8 sm:px-10 sm:py-10 border border-blue-100">
                <h1 className="mb-3 text-2xl sm:text-3xl font-extrabold text-blue-600">
                  📚 Kids Book Games
                </h1>
                <p className="text-sm sm:text-base text-blue-700 mb-4">
                  Chọn một Project từ sidebar để bắt đầu chơi game!
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {projects.slice(0, 5).map((project) => (
                    <span
                      key={project.id}
                      className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
                    >
                      {project.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


