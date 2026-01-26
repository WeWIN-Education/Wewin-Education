import { AuthUser } from "@/types/auth-user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  hasRole: (roleName: string) => boolean;
  hasPermission: (permissionName: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: AuthUser) => set({ user, isAuthenticated: true }),

      clearUser: () => set({ user: null, isAuthenticated: false }),

      hasRole: (roleName: string) => {
        const user = get().user;
        if (!user || !Array.isArray(user.roles)) return false;

        return user.roles.some(
          (role) => role.name === roleName && role.isDisabled !== true,
        );
      },

      hasPermission: (permissionName: string) => {
        const user = get().user;
        if (!user || !user.roles) return false;

        // ⭐ ADMIN bypass toàn bộ permission
        const isAdmin = user.roles.some(
          (r) => r.name === "ADMIN" && r.isDisabled !== true,
        );

        if (isAdmin) return true;

        // 🔍 Check permission thường
        return user.roles.some(
          (role) =>
            role.isDisabled !== true &&
            role.permissions?.some(
              (p) => p.name === permissionName && p.isDisabled !== true,
            ),
        );
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
