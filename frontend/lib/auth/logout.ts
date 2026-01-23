"use client";

import { signOut } from "next-auth/react";
import { Routes } from "@/lib/constants/routes";

export const handleLogout = () => {
  signOut({ callbackUrl: Routes.HOME });
};
