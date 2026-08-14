"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  THEME_CLASS_NAMES,
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
} from "@/constants/theme";

export { THEME_STORAGE_KEY } from "@/constants/theme";

const MEDIA_QUERY = "(prefers-color-scheme: dark)";

type ResolvedTheme = (typeof THEME_CLASS_NAMES)[number];

interface ThemeContextValue {
  themes: string[];
  forcedTheme?: string;
  setTheme: Dispatch<SetStateAction<string>>;
  theme?: string;
  resolvedTheme?: string;
  systemTheme?: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextValue>({
  setTheme: () => {},
  themes: [],
});

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia(MEDIA_QUERY).matches ? "dark" : "light";
};

const readStoredTheme = (storageKey: string, defaultTheme: string) => {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  try {
    return localStorage.getItem(storageKey) || defaultTheme;
  } catch {
    return defaultTheme;
  }
};

const disableTransitions = (nonce?: string) => {
  const style = document.createElement("style");

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }

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

interface ThemeProviderProps {
  children: ReactNode;
  attribute?: "class" | `data-${string}`;
  defaultTheme?: string;
  enableSystem?: boolean;
  enableColorScheme?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: string;
  value?: Record<string, string>;
  nonce?: string;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = THEME_DEFAULT,
  enableSystem = true,
  enableColorScheme = true,
  disableTransitionOnChange = false,
  storageKey = THEME_STORAGE_KEY,
  themes = [...THEME_CLASS_NAMES],
  forcedTheme,
  value,
  nonce,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(() =>
    readStoredTheme(storageKey, defaultTheme),
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    getSystemTheme(),
  );
  const [mounted, setMounted] = useState(false);

  const classNames = useMemo(
    () => (value ? themes.map((name) => value[name] || name) : themes),
    [themes, value],
  );

  const applyTheme = useCallback(
    (nextTheme: string | undefined) => {
      if (!nextTheme) {
        return;
      }

      const resolvedTheme =
        nextTheme === "system" && enableSystem ? getSystemTheme() : nextTheme;
      const attrValue = value?.[resolvedTheme] ?? resolvedTheme;
      const root = document.documentElement;
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitions(nonce)
        : null;

      if (attribute === "class") {
        root.classList.remove(...classNames);
        root.classList.add(attrValue);
      } else if (attribute.startsWith("data-")) {
        root.setAttribute(attribute, attrValue);
      }

      if (enableColorScheme) {
        if (resolvedTheme === "light" || resolvedTheme === "dark") {
          root.style.colorScheme = resolvedTheme;
        }
      }

      restoreTransitions?.();
    },
    [
      attribute,
      classNames,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      nonce,
      value,
    ],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    applyTheme(forcedTheme ?? theme);
  }, [applyTheme, forcedTheme, mounted, theme]);

  useEffect(() => {
    if (!enableSystem) {
      return;
    }

    const media = window.matchMedia(MEDIA_QUERY);

    const handleChange = () => {
      const nextSystemTheme = getSystemTheme();
      setSystemTheme(nextSystemTheme);

      if (theme === "system" && !forcedTheme) {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);
    handleChange();

    return () => media.removeEventListener("change", handleChange);
  }, [applyTheme, enableSystem, forcedTheme, theme]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) {
        return;
      }

      setThemeState(event.newValue || defaultTheme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [defaultTheme, storageKey]);

  const setTheme = useCallback<Dispatch<SetStateAction<string>>>(
    (nextTheme) => {
      setThemeState((currentTheme) => {
        const resolvedTheme =
          typeof nextTheme === "function" ? nextTheme(currentTheme) : nextTheme;

        try {
          localStorage.setItem(storageKey, resolvedTheme);
        } catch {
          // Ignore write failures in restricted environments.
        }

        return resolvedTheme;
      });
    },
    [storageKey],
  );

  const contextValue = useMemo<ThemeContextValue>(() => {
    const resolvedTheme =
      theme === "system" && enableSystem ? systemTheme : theme;

    return {
      theme: mounted ? theme : undefined,
      setTheme,
      forcedTheme,
      resolvedTheme: mounted ? resolvedTheme : undefined,
      systemTheme: enableSystem ? systemTheme : undefined,
      themes: enableSystem ? [...themes, "system"] : themes,
    };
  }, [
    enableSystem,
    forcedTheme,
    mounted,
    setTheme,
    systemTheme,
    theme,
    themes,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
