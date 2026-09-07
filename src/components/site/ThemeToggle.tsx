import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";
type Theme = typeof THEME_DARK | typeof THEME_LIGHT;

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return THEME_LIGHT;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === THEME_DARK ? THEME_DARK : THEME_LIGHT;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle(THEME_DARK, theme === THEME_DARK);
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window === "undefined" ? THEME_LIGHT : getInitialTheme(),
  );

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const isDark = theme === THEME_DARK;

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border transition-colors",
        "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95",
        className,
      )}
    >
      <span key={theme} className="theme-icon" aria-hidden="true">
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </span>
    </button>
  );
}
