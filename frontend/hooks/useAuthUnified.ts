"use client";

import { useSession } from "next-auth/react";
import { useUserQuery } from "./useUserQuery";
import { useEffect, useState } from "react";
import { storage } from "@/app/utils/storage";

export function useAuthUnified() {
  const { data: session } = useSession();
  const { data: backendUser, isLoading } = useUserQuery();

  const loginType = storage.get("login_type");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isLoading) {
    return { user: undefined, loginType: null, loading: true };
  }

  // GOOGLE LOGIN
  if (loginType === "google") {
    if (backendUser) {
      return { user: backendUser, loginType: "google", loading: false };
    }
    return {
      user: session?.user ?? null,
      loginType: "google",
      loading: false,
    };
  }

  // CREDENTIALS LOGIN
  if (loginType === "credentials") {
    return { user: backendUser, loginType: "credentials", loading: false };
  }

  return { user: null, loginType: null, loading: false };
}
