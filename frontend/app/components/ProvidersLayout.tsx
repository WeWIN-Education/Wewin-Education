"use client";

import Navbar from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import Footer from "./layouts/footer";
import { useAuthStore } from "@/stores/auth.store";
import { PERMISSIONS } from "@/lib/constants/permission";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Lấy trực tiếp từ Zustand
  const hasPermission = useAuthStore((s) => s.hasPermission);
  const user = useAuthStore((s) => s.user);

  const canViewSidebar =
    !!user && hasPermission(PERMISSIONS.SIDEBAR_MANAGEMENT);

  return (
    <>
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🧩 Main Area */}
      <div className="flex flex-1 w-full overflow-hidden">
        {canViewSidebar && (
          <aside className="hidden md:flex text-white shadow-lg flex-col justify-between">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 bg-[#f9f9f9] overflow-x-hidden max-w-full">
          {children}
        </main>
      </div>

      {/* ⚓ Footer */}
      <Footer />
    </>
  );
}
