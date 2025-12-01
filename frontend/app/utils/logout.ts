import { signOut } from "next-auth/react";

export function handleLogout(loginType?: "google" | "credentials") {
  if (loginType === "google") {
    signOut({ callbackUrl: "/" });
    return;
  }

  // Logout backend
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "/";
}
