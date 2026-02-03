"use client";

import { signOut } from "next-auth/react";
import { Routes } from "../constants/routes";

export const handleLogout = async () => {
  await signOut({
    callbackUrl: Routes.HOME,
    redirect: true,
  });
};
