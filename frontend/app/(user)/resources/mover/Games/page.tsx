"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getProjectsFromMoverBook } from "@/lib/constants/moverBookConfig";

export default function MoverBookGamesPage() {
  const router = useRouter();
  useEffect(() => {
    const projectsForSidebar = getProjectsFromMoverBook();
    if (!projectsForSidebar.length) return;
    const firstProject = projectsForSidebar[0];
    router.replace(`/resources/mover/Games/${firstProject.id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-600 font-semibold">
      Đang mở Mover Book...
    </div>
  );
}

