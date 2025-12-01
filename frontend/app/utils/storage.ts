"use client";

export const storage = {
  getUser: () => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    try {
      return JSON.parse(raw || "null");
    } catch {
      return null;
    }
  },

  setUser: (user: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  set: (key: string, value: any) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  },

  get: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return localStorage.getItem(key);
    }
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};
