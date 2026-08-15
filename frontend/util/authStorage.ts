const AUTH_TOKEN_KEY = "admin-dashboard-token";

const unauthorizedListeners = new Set<() => void>();

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const subscribeUnauthorized = (listener: () => void) => {
  unauthorizedListeners.add(listener);

  return () => {
    unauthorizedListeners.delete(listener);
  };
};

export const notifyUnauthorized = () => {
  unauthorizedListeners.forEach((listener) => listener());
};
