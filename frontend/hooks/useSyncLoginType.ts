"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { storage } from "@/app/utils/storage";

export function useSyncLoginType() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    /* CASE 1: Google login */
    if (session.loginType === "google") {
      storage.set("login_type", "google");
      if (session.accessToken) {
        storage.set("access_token", session.accessToken);
      }
    }

    /* CASE 2: Credentials login */
    if (session.loginType === "credentials") {
      storage.set("login_type", "credentials");
    }
  }, [session]);
}
