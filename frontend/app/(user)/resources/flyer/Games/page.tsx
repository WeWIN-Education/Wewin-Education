"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProjectsFromFlyerBook } from "@/lib/constants/flyerBookConfig";

export default function FlyerBookGamesPage() {
  const router = useRouter();

  useEffect(() => {
    const projects = getProjectsFromFlyerBook();
    if (!projects.length) return;
    const first = projects[0];
    router.replace(`/resources/flyer/Games/${first.id}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-600 font-semibold">
      Đang mở Flyer Book...
    </div>
  );
}

