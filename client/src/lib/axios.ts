import axios from "axios";
import useAuthStore from "../stores/authStore";
import { apiURLs } from "./apiURLs";
import { authApi } from "../api/user";

const api = axios.create({
  baseURL: process.env.API_URL,
});
console.log(process.env.API_URL);
api.interceptors.request.use(
  (config) => {
    /* const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== apiURLs.AUTH.refresh
    ) {
      originalRequest._retry = true;
      try {
        await authApi.refresh();

        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setCurrentuser(null);
        useAuthStore.getState().setIsAuthenticated(false);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
