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
import { THEME_CLASS_NAMES } from "@/constants/theme";

interface ThemeContextValue {
  theme?: string;
  setTheme: (theme: string) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: "class";
  defaultTheme?: string;
  enableSystem?: boolean;
  storageKey?: string;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

const getSystemTheme = () =>
  window.matchMedia(COLOR_SCHEME_QUERY).matches ? "dark" : "light";

const disableTransitions = () => {
  const style = document.createElement("style");
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}",
    ),
  );
  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1);
  };
};

const applyThemeClass = (resolved: string, enableColorScheme: boolean) => {
  const root = document.documentElement;
  root.classList.remove(...THEME_CLASS_NAMES);
  root.classList.add(resolved);

  if (enableColorScheme && (resolved === "light" || resolved === "dark")) {
    root.style.colorScheme = resolved;
  }
};

export const ThemeProvider = ({
  children,
  defaultTheme = "light",
  enableSystem = true,
  storageKey = "theme",
  disableTransitionOnChange = false,
  enableColorScheme = true,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<string | undefined>(undefined);

  const resolveTheme = useCallback(
    (value: string) => {
      if (value === "system" && enableSystem) {
        return getSystemTheme();
      }

      return value;
    },
    [enableSystem],
  );

  const apply = useCallback(
    (value: string) => {
      const restore = disableTransitionOnChange ? disableTransitions() : null;
      applyThemeClass(resolveTheme(value), enableColorScheme);
      restore?.();
    },
    [disableTransitionOnChange, enableColorScheme, resolveTheme],
  );

  useEffect(() => {
    let stored: string | undefined;

    try {
      stored = localStorage.getItem(storageKey) || undefined;
    } catch {
      stored = undefined;
    }

    setThemeState(stored || defaultTheme);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (!theme) {
      return;
    }

    apply(theme);
  }, [apply, theme]);

  useEffect(() => {
    if (!enableSystem) {
      return;
    }

    const media = window.matchMedia(COLOR_SCHEME_QUERY);
    const onChange = () => {
      if (theme === "system") {
        apply("system");
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [apply, enableSystem, theme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        setThemeState(event.newValue || defaultTheme);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [defaultTheme, storageKey]);

  const setTheme = useCallback(
    (value: string) => {
      setThemeState(value);

      try {
        localStorage.setItem(storageKey, value);
      } catch {
        // Ignore quota / private-mode failures; the in-memory theme still updates.
      }
    },
    [storageKey],
  );

  const contextValue = useMemo(
    () => ({ theme, setTheme }),
    [setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: undefined,
      setTheme: () => undefined,
    };
  }

  return context;
};
