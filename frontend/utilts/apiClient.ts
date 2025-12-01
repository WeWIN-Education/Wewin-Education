import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto refresh
let refreshing = false;
let queue: any[] = [];

const resolveQueue = (error: any, token: string | null = null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (refreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject });
        }).then((newToken) => {
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        });
      }

      original._retry = true;
      refreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const newToken = res.data.access_token;
        localStorage.setItem("access_token", newToken);

        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        resolveQueue(null, newToken);

        return api(original);
      } catch (err) {
        resolveQueue(err, null);
        throw err;
      } finally {
        refreshing = false;
      }
    }

    throw error;
  }
);

export default api;
