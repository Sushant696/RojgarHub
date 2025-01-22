import axios from "axios";
import useAuthStore from "../stores/authStore";

const api = axios.create({
  baseURL: process.env.API_URL,
});

// Run before every request
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    // auto include auth headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Run After every request
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
