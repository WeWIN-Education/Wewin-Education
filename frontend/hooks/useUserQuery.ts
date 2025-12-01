"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { storage } from "@/app/utils/storage";
import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Lấy user từ API backend
 */
async function fetchBackendUser(accessToken: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export function useUserQuery() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return useQuery({
    queryKey: ["auth_user", session?.user?.email],
    enabled: mounted, // ❗ CHỈ CẦN MOUNTED

    queryFn: async () => {
      const loginType = storage.get("login_type");

      /* Credentials login */
      if (loginType === "credentials") {
        return storage.getUser();
      }

      /* Google login */
      if (loginType === "google" && session?.accessToken) {
        return fetchBackendUser(session.accessToken);
      }

      return null;
    },

    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}
