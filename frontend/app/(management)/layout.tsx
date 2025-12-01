"use client";

import { useEffect, useState } from "react";
import { allowedEmails } from "@/app/constants/email";
import { storage } from "@/app/utils/storage";
import { apiCall } from "@/app/utils/apiClient";
import { useRouter } from "next/navigation";

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {

      // ⭐ 1. Check Google email
      const gEmail = storage.get("google_email");
      if (gEmail && allowedEmails.includes(gEmail)) {
        setAllowed(true);
        setChecking(false);
        return;
      }

      // ⭐ 2. Check backend token
      const token = storage.get("access_token");

      if (token) {
        try {
          const me = await apiCall("/auth/me", {
            method: "GET",
            token,
          });

          const email = me?.email;
          if (allowedEmails.includes(email)) {
            setAllowed(true);
            setChecking(false);
            return;
          }
        } catch (err) {
          console.log("auth/me error", err);
        }
      }

      router.push("/login");
    };

    checkAuth();
  }, []);

  if (checking) {
    return <div className="p-10 text-center font-semibold">Đang kiểm tra quyền truy cập...</div>;
  }

  return <>{children}</>;
}
