import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "charis-portfolio-theme";

function setDocumentTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initialTheme: Theme =
      saved === "dark" || saved === "light"
        ? saved
        : media.matches
          ? "dark"
          : "light";

    setTheme(initialTheme);
    setDocumentTheme(initialTheme);

    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
      setDocumentTheme(nextTheme);
    };

    media.addEventListener("change", followSystemTheme);
    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
    setDocumentTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" />
        <path d="M12 2.25v2.1M12 19.65v2.1M2.25 12h2.1M19.65 12h2.1M5.1 5.1l1.5 1.5M17.4 17.4l1.5 1.5M18.9 5.1l-1.5 1.5M6.6 17.4l-1.5 1.5" />
      </svg>
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.15 14.55A8.35 8.35 0 0 1 9.45 3.85 8.35 8.35 0 1 0 20.15 14.55Z" />
      </svg>
    </button>
  );
}
