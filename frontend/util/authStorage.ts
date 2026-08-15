const AUTH_TOKEN_KEY = "admin-dashboard-token";

const unauthorizedListeners = new Set<() => void>();

const getStorage = (persistent: boolean) =>
  persistent ? window.localStorage : window.sessionStorage;

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    window.localStorage.getItem(AUTH_TOKEN_KEY) ??
    window.sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
};

export const setAuthToken = (token: string, rememberMe = true) => {
  clearAuthToken();
  getStorage(rememberMe).setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
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
