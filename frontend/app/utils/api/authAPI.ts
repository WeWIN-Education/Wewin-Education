import api from "@/utilts/apiClient";

export const authAPI = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  logoutBackend: (userId: string) =>
    api.post("/auth/logout", { userId }),

  getMe: () => api.get("/auth/me"),
};
