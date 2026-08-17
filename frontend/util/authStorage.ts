const AUTH_TOKEN_KEY = "admin-dashboard-token";
const AUTH_SYNC_CHANNEL = "admin-dashboard-auth";

const unauthorizedListeners = new Set<() => void>();

type AuthSyncMessage =
  | { type: "login"; token: string; rememberMe: boolean }
  | { type: "logout" };

const getStorage = (persistent: boolean) =>
  persistent ? window.localStorage : window.sessionStorage;

let authChannel: BroadcastChannel | null = null;

const getAuthChannel = () => {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") {
    return null;
  }

  if (!authChannel) {
    authChannel = new BroadcastChannel(AUTH_SYNC_CHANNEL);
  }

  return authChannel;
};

const broadcastAuthSync = (message: AuthSyncMessage) => {
  getAuthChannel()?.postMessage(message);
};

const removeAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

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
  removeAuthToken();
  getStorage(rememberMe).setItem(AUTH_TOKEN_KEY, token);
  broadcastAuthSync({ type: "login", token, rememberMe });
};

export const applyAuthTokenFromSync = (token: string, rememberMe = true) => {
  removeAuthToken();
  getStorage(rememberMe).setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = (options?: { broadcast?: boolean }) => {
  removeAuthToken();

  if (options?.broadcast !== false) {
    broadcastAuthSync({ type: "logout" });
  }
};

export const subscribeAuthSync = (
  listener: (message: AuthSyncMessage) => void,
) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key && event.key !== AUTH_TOKEN_KEY) {
      return;
    }

    const token = getAuthToken();
    if (token) {
      listener({ type: "login", token, rememberMe: true });
      return;
    }

    listener({ type: "logout" });
  };

  const onMessage = (event: MessageEvent<AuthSyncMessage>) => {
    const message = event.data;
    if (!message || (message.type !== "login" && message.type !== "logout")) {
      return;
    }

    listener(message);
  };

  window.addEventListener("storage", onStorage);
  const channel = getAuthChannel();
  channel?.addEventListener("message", onMessage);

  return () => {
    window.removeEventListener("storage", onStorage);
    channel?.removeEventListener("message", onMessage);
  };
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
