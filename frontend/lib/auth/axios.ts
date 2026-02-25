import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";
import { Routes } from "@/lib/constants/routes";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      const session = await getSession();

      // 🔥 refresh token fail → logout
      if (session?.error === "RefreshAccessTokenError") {
        await signOut({
          callbackUrl: Routes.LOGIN,
          redirect: true,
        });
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
