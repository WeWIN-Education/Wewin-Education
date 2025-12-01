"use client";

import { useAuthUnified } from "@/hooks/useAuthUnified";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminEmails } from "@/app/constants/email";
import { Routes } from "../constants/routes";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthUnified();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  // Mount only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect logic
  useEffect(() => {
    if (!mounted) return;          // Không redirect khi chưa mount
    if (user === undefined) return; // Đang loading

    if (user === null) {
      router.replace(Routes.LOGIN_PAGE);
      return;
    }

    if (!adminEmails.includes(user.email)) {
      router.replace(Routes.HOME);
    }
  }, [mounted, user, router]);

  // Chờ xác thực
  if (!mounted || user === undefined) {
    return null;
  }

  // Nếu user null → redirect đang chạy, return null để tránh flash
  if (user === null) return null;

  return <>{children}</>;
}
