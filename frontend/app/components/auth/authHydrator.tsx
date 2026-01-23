"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth.store";
import type { AuthUser } from "@/types/auth-user";

export default function AuthHydrator() {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user as unknown as AuthUser);
    }

    if (status === "unauthenticated") {
      clearUser();
    }
  }, [status, session, setUser, clearUser]);

  return null;
}
