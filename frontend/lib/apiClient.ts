import axios from "axios";
import { API_BASE_URL } from "@/constants/api";
import {
  clearAuthToken,
  getAuthToken,
  notifyUnauthorized,
} from "@/util/authStorage";

export const apiClient = axios.create({
  baseURL: "https://dummyjson.com/",
});

const isBackendRequest = (url?: string) =>
  typeof url === "string" && url.startsWith(API_BASE_URL);

const isPublicAuthRequest = (url?: string) =>
  typeof url === "string" &&
  (url.includes("/auth/login") ||
    url.includes("/auth/register") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password") ||
    url.includes("/auth/verify-email") ||
    url.includes("/auth/verification-status") ||
    url.includes("/auth/resend-verification"));

const isFormData = (data: unknown) =>
  typeof FormData !== "undefined" && data instanceof FormData;

apiClient.interceptors.request.use((config) => {
  if (isFormData(config.data)) {
    config.headers.delete("Content-Type");
  } else if (!config.headers.has("Content-Type")) {
    config.headers.set("Content-Type", "application/json");
  }

  const token = getAuthToken();

  if (token && isBackendRequest(config.url)) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = axios.isAxiosError(error) ? error.config?.url : undefined;

    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      isBackendRequest(url) &&
      !isPublicAuthRequest(url)
    ) {
      clearAuthToken();
      notifyUnauthorized();
    }

    return Promise.reject(error);
  }
);
