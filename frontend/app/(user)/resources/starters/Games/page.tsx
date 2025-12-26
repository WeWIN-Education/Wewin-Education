"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProjectsFromStarterBook } from "@/app/constants/starterBookConfig";

export default function StarterBookGamesPage() {
  const router = useRouter();
  useEffect(() => {
    const projectsForSidebar = getProjectsFromStarterBook();
    if (!projectsForSidebar.length) return;
    const firstProject = projectsForSidebar[0];
    router.replace(`/resources/starters/Games/${firstProject.id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyan-50 text-cyan-600 font-semibold">
      Đang mở Starter Book...
    </div>
  );
}

