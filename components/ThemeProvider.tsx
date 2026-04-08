"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "wall-cal-theme";
const THEME_EVENT = "wall-cal-theme-change";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

function applyClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getThemeSnapshot(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return "dark";
  if (stored === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribeTheme(onChange: () => void) {
  const handler = () => onChange();
  window.addEventListener(THEME_EVENT, handler);
  window.addEventListener("storage", handler);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", handler);
  return () => {
    window.removeEventListener(THEME_EVENT, handler);
    window.removeEventListener("storage", handler);
    mq.removeEventListener("change", handler);
  };
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem(STORAGE_KEY, t);
    applyClass(t);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
