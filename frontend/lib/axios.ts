import axios from "axios";
import { getSession } from "next-auth/react";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
