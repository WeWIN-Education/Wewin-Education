"use client";

import { signOut } from "next-auth/react";
import { authAPI } from "@/app/utils/api/authAPI";
import { storage } from "@/app/utils/storage";
import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  const logout = async (loginType: string | null) => {
    // Google logout
    if (loginType === "google") {
      await signOut({ callbackUrl: "/" });
      return;
    }

    // Backend logout
    const user = storage.getUser();
    if (user) {
      await authAPI.logoutBackend(user.id);
    }

    storage.clear();
    queryClient.invalidateQueries({
      queryKey: ["auth_user"],
    });

    window.location.href = "/";
  };

  return { logout };
}
