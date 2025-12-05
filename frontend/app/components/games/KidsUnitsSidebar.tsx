"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpen, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { getProjectsFromBook } from "@/app/constants/bookConfig";

/**
 * Sidebar đơn giản cho các trang game lẻ Kids Book
 * - Hiển thị danh sách Unit / Project
 * - Có thể thu gọn / mở rộng giống sidebar admin
 * - Highlight unit đang mở
 */
export function KidsUnitsSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const projects = getProjectsFromBook();

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`hidden md:flex h-full flex-col border-r border-pink-200 bg-gradient-to-b from-pink-100/90 to-pink-50 shadow-xl transition-all duration-300 overflow-hidden ${
        collapsed ? "w-16" : "w-72"
      }`}
    >
      {/* Header (đồng bộ với KidsBookScreen) */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 border-b border-pink-200/70 bg-gradient-to-r from-pink-200 to-pink-100">
        <div className="w-9 h-9 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm">
          <BookOpen className="w-5 h-5 text-pink-700" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-extrabold text-pink-800 tracking-wide">
              Kids Book
            </div>
            <div className="text-[11px] font-medium text-pink-700">
              Chọn Unit để chuyển nhanh
            </div>
          </div>
        )}
      </div>

      {/* Danh sách Unit */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {projects.map((project) => {
          const href = `/resources/kids/Games/${project.id}`;
          const active = isActive(href);
          return (
            <Link
              key={project.id}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group ${
                active
                  ? "bg-white/25 shadow-lg scale-[1.01]"
                  : "hover:bg-white/10 hover:scale-[1.01]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all ${
                  active
                    ? "bg-white shadow-sm"
                    : "bg-white/70 group-hover:bg-white shadow-sm"
                }`}
              >
                <span className="text-base">📘</span>
              </div>
              {!collapsed && (
                <span
                  className={`text-[14px] line-clamp-2 ${
                    active ? "font-semibold text-pink-900" : "text-pink-800"
                  }`}
                >
                  {project.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Nút thu gọn / mở rộng */}
      <div className="flex-shrink-0 mt-auto p-3 border-t border-pink-200/70">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-full flex items-center justify-center gap-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-xl py-2 text-xs font-semibold transition-all"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span>Thu gọn</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}


