"use client";

import { useState } from "react";

type BookProjectsScreenProps = {
  projects: {
    id: string;
    name: string;
  }[];
  onSelectProject?: (projectId: string) => void;
};

export function BookProjectsScreen({
  projects,
  onSelectProject,
}: BookProjectsScreenProps) {
  const [playerId, setPlayerId] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    onSelectProject?.(projectId);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-gradient-to-br from-pink-50 via-rose-50 to-emerald-50">
      {/* Sidebar Projects */}
      <aside className="flex w-64 flex-col bg-gradient-to-b from-pink-200 via-pink-100 to-pink-200 shadow-[4px_0_16px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 px-4 py-5 border-b border-pink-200/70 bg-gradient-to-r from-pink-300 to-pink-200">
          <span className="text-3xl">🌟</span>
          <div className="leading-tight">
            <p className="text-lg font-extrabold text-white drop-shadow-sm">
              Kids Book
            </p>
            <p className="text-xs font-semibold text-pink-50/90">
              Chọn Project để bắt đầu
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
          {projects.map((project, index) => {
            const isActive = selectedProjectId === project.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSelectProject(project.id)}
                className={`w-full rounded-2xl border text-left px-4 py-4 text-base font-semibold transition-all shadow-sm bg-gradient-to-r ${
                  isActive
                    ? "from-pink-400 to-rose-400 text-white border-pink-400 shadow-lg scale-[1.02]"
                    : "from-pink-50 to-rose-50 text-pink-800 border-pink-100 hover:from-pink-100 hover:to-rose-100 hover:shadow-md"
                }`}
              >
                Project {index + 1}
                <span className="block text-xs font-normal opacity-80">
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar: ID input */}
        <div className="px-6 pt-4 pb-3 border-b border-pink-100 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-5xl flex items-center gap-4">
            <div className="text-sm font-semibold text-pink-800 shrink-0">
              ID:
            </div>
            <input
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              placeholder="Nhập ID một lần cho tất cả game"
              className="flex-1 rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-pink-900 shadow-inner focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300/60"
            />
            <button
              type="button"
              className="shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 transition"
            >
              Lưu ID
            </button>
          </div>
        </div>

        {/* Welcome / content area */}
        <div className="flex-1 flex items-center justify-center px-4">
          {!selectedProjectId ? (
            <div className="text-center">
              <div className="mb-4 text-4xl sm:text-5xl font-extrabold text-pink-500 drop-shadow-sm">
                👋 Chào mừng!
              </div>
              <p className="max-w-xl text-base sm:text-lg font-semibold text-rose-700/90">
                Vui lòng chọn <span className="font-bold">Project</span> ở
                sidebar bên trái để xem các game.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-3 text-3xl font-extrabold text-pink-600">
                Project đã chọn
              </div>
              <p className="text-base text-rose-700/90">
                Bạn đang chọn{" "}
                <span className="font-bold">
                  {projects.find((p) => p.id === selectedProjectId)?.name ??
                    selectedProjectId}
                </span>
                . Hãy tích hợp component game/unit ở đây.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


