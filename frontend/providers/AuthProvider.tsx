"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser } from "@/lib/authApi";
import type { AuthUser } from "@/types/auth";
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
  subscribeUnauthorized,
} from "@/util/authStorage";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((token: string, user: AuthUser) => {
    setAuthToken(token);
    setUser(user);
    setIsReady(true);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
  }, []);

  useEffect(() => {
    return subscribeUnauthorized(() => {
      setUser(null);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const restoreSession = async () => {
      const token = getAuthToken();

      if (!token) {
        setIsReady(true);
        return;
      }

      try {
        const data = await getCurrentUser();

        if (!cancelled) {
          setUser(data.data.user);
        }
      } catch {
        if (!cancelled && getAuthToken() === token) {
          clearAuthToken();
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    };

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      login,
      logout,
      updateUser,
    }),
    [isReady, login, logout, updateUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
