"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  GraduationCap,
  FolderOpen,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
  Warehouse,
  School,
  List,
  ListChecks,
  History,
} from "lucide-react";
import { Routes } from "@/lib/constants/routes";

export default function Sidebar() {
  const pathname = usePathname();
  /* ===== DERIVED STATE (QUAN TRỌNG) ===== */
  const isClassRoute =
    pathname === Routes.MANAGE_CLASS ||
    pathname.startsWith(`${Routes.MANAGE_CLASS}/`);

  /* ===== UI STATE ===== */
  const [manualOpen, setManualOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const openMenu = isClassRoute || manualOpen;

  const isStorageRoute =
    pathname === Routes.MANAGE_STORAGE ||
    pathname.startsWith(`${Routes.MANAGE_STORAGE}/`);

  const [storageOpen, setStorageOpen] = useState(true);

  const openStorageMenu = isStorageRoute || storageOpen;

  // ✅ Logic xác định active
  const isActive = (href: string) => pathname === href;
  const isGroupActive = (base: string) =>
    pathname === base || pathname.startsWith(`${base}/`);

  return (
    <div
      className={`h-full transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-70"
      } bg-linear-to-br from-[#0B4BA8] via-[#1565C0] to-[#1976D2]
        text-white shadow-2xl flex flex-col overflow-hidden`}
    >
      {/* 🔹 Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h2 className="text-sm font-semibold text-white/90">
              Bảng điều khiển
            </h2>
            <p className="text-xs text-white/60">Hệ thống quản lý</p>
          </div>
        )}
      </div>

      {/* 🔹 Menu chính */}
      <nav className="p-3 flex-1 space-y-2 overflow-y-auto">
        {/* Group: Class Management */}
        <div>
          <button
            onClick={() => setManualOpen((v) => !v)}
            className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl 
                        transition-all duration-200 group 
                        ${
                          isGroupActive(Routes.MANAGE_CLASS)
                            ? "bg-white/10"
                            : "hover:bg-white/10"
                        }`}
          >
            <span className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isGroupActive(Routes.MANAGE_CLASS)
                    ? "bg-white/20"
                    : "bg-white/10 group-hover:bg-white/20"
                }`}
              >
                <School className="w-4 h-4" />
              </div>
              {!collapsed && (
                <span className="font-semibold text-[15px]">Lớp học</span>
              )}
            </span>

            {!collapsed && (
              <div
                className={`w-6 h-6 bg-white/10 rounded-md flex items-center justify-center 
                group-hover:bg-white/20 transition-all ${
                  openMenu ? "rotate-0" : "-rotate-90"
                }`}
              >
                <ChevronDown size={14} className="text-white/80" />
              </div>
            )}
          </button>

          {/* Submenu */}
          {!collapsed && openMenu && (
            <ul className="ml-3 mt-2 space-y-1 border-l-2 border-white/20 pl-4 transition-all duration-300">
              <li>
                <SidebarLink
                  href={Routes.MANAGE_CLASS}
                  label="Danh sách"
                  icon={<List className="w-4 h-4" />}
                  active={isActive(Routes.MANAGE_CLASS)}
                />
              </li>
              <li>
                <SidebarLink
                  href={Routes.MANAGE_CLASS_CATEGORY}
                  label="Phân loại"
                  icon={<FolderOpen className="w-4 h-4" />}
                  active={isActive(Routes.MANAGE_CLASS_CATEGORY)}
                />
              </li>
            </ul>
          )}
        </div>

        {/* Student Link */}
        <SidebarLink
          href={Routes.MANAGE_STUDENT}
          label="Học sinh"
          icon={<Users className="w-4 h-4" />}
          active={isActive(Routes.MANAGE_STUDENT)}
          collapsed={collapsed}
        />

        {/* Group: Storage Management */}
        <div>
          <button
            onClick={() => setStorageOpen((v) => !v)}
            className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl 
            transition-all duration-200 group 
            ${
              isGroupActive(Routes.MANAGE_STORAGE)
                ? "bg-white/10"
                : "hover:bg-white/10"
            }`}
          >
            <span className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isGroupActive(Routes.MANAGE_STORAGE)
                    ? "bg-white/20"
                    : "bg-white/10 group-hover:bg-white/20"
                }`}
              >
                <Warehouse className="w-4 h-4" />
              </div>

              {!collapsed && (
                <span className="font-semibold text-[15px]">Kho lưu trữ</span>
              )}
            </span>

            {!collapsed && (
              <div
                className={`w-6 h-6 bg-white/10 rounded-md flex items-center justify-center 
          group-hover:bg-white/20 transition-all ${
            openStorageMenu ? "rotate-0" : "-rotate-90"
          }`}
              >
                <ChevronDown size={14} className="text-white/80" />
              </div>
            )}
          </button>

          {/* Submenu Storage */}
          {!collapsed && openStorageMenu && (
            <ul className="ml-3 mt-2 space-y-1 border-l-2 border-white/20 pl-4">
              <li>
                <SidebarLink
                  href={Routes.MANAGE_STORAGE_LIST}
                  label="Danh sách"
                  icon={<List className="w-4 h-4" />}
                  active={isActive(Routes.MANAGE_STORAGE_LIST)}
                />
              </li>
              <li>
                <SidebarLink
                  href={Routes.MANAGE_STORAGE_REQUEST}
                  label="Chờ duyệt"
                  icon={<ListChecks className="w-4 h-4" />}
                  active={isActive(Routes.MANAGE_STORAGE_REQUEST )}
                />
              </li>
              <li>
                <SidebarLink
                  href={Routes.MANAGE_STORAGE_HISTORY}
                  label="Lịch sử"
                  icon={<History className="w-4 h-4" />}
                  active={isActive(Routes.MANAGE_STORAGE_HISTORY)}
                />
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* 🔹 Nút toggle thu gọn ở cuối sidebar */}
      <div className="mt-auto p-3 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 
                     rounded-lg py-2.5 transition-all text-sm font-semibold"
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
    </div>
  );
}

/* 🔹 Subcomponent: Sidebar Link */
function SidebarLink({
  href,
  label,
  icon,
  active,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group 
        ${
          active
            ? "bg-white/25 shadow-lg scale-[1.02]"
            : "hover:bg-white/10 hover:scale-[1.01]"
        }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
          active ? "bg-white/30" : "bg-white/10 group-hover:bg-white/20"
        }`}
      >
        {icon}
      </div>
      {!collapsed && (
        <span
          className={`text-[15px] ${
            active ? "font-semibold text-white" : "font-medium text-white/90"
          }`}
        >
          {label}
        </span>
      )}
    </Link>
  );
}
