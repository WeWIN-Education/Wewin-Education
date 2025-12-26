"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BookOpen, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { getProjectsFromBook } from "@/app/constants/bookConfig";

type KidsUnitsSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
  basePath?: string; // Mặc định: "/resources/kids/Games"
};

/**
 * Sidebar đơn giản cho các trang game lẻ Kids Book
 * - Hiển thị danh sách Unit / Project
 * - Có thể thu gọn / mở rộng giống sidebar admin
 * - Highlight unit đang mở
 * - Responsive: trên mobile có hamburger menu
 */
export function KidsUnitsSidebar({ isOpen = false, onClose, basePath = "/resources/kids/Games" }: KidsUnitsSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const projects = getProjectsFromBook();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Đóng sidebar khi click vào link trên mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  // Ngăn scroll body khi sidebar mở trên mobile
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay cho mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static top-[72px] md:top-0 left-0 h-screen md:h-auto md:min-h-full md:self-stretch flex flex-col border-r border-pink-200 bg-pink-50 shadow-xl transition-all duration-300 overflow-hidden z-40 ${
          collapsed ? "w-16" : "w-72"
        } ${
          // Mobile: slide in/out từ bên trái
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        } ${
          // Desktop: luôn hiển thị
          "md:flex"
        }`}
      >
      {/* Header (đồng bộ với KidsBookScreen) */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 py-4 border-b border-pink-200/70 bg-pink-50">
        <div className="w-9 h-9 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm">
          <BookOpen className="w-5 h-5 text-blue-700" />
        </div>
        {!collapsed && (
          <div className="flex-1">
            <div className="text-sm font-extrabold text-blue-800 tracking-wide">
              Kids Book
            </div>
            <div className="text-[11px] font-medium text-blue-700">
              Chọn Unit để chuyển nhanh
            </div>
          </div>
        )}
        {/* Nút đóng trên mobile */}
        {!collapsed && onClose && (
          <button
            onClick={onClose}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-200/50 transition-colors"
          >
            <X className="w-5 h-5 text-blue-800" />
          </button>
        )}
      </div>

      {/* Danh sách Unit */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {projects.map((project) => {
          const href = `${basePath}/${project.id}`;
          const active = isActive(href);
          return (
            <Link
              key={project.id}
              href={href}
              onClick={handleLinkClick}
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
                    active ? "font-semibold text-blue-900" : "text-blue-800"
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
      <div className="flex-shrink-0 mt-auto p-3 border-t border-blue-200/70">
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl py-2 text-xs font-semibold transition-all"
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
    </>
  );
}


