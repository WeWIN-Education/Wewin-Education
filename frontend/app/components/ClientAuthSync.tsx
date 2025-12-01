"use client";

import { useSyncLoginType } from "@/hooks/useSyncLoginType";

export default function ClientAuthSync() {
  useSyncLoginType(); // Hook để sync loginType và token
  return null;
}
