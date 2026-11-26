"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

/** Data that ThemeContext gives to every page */
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};


const ThemeContext = createContext<ThemeContextType | null>(null);

/**
 * Gives theme data to all pages
 * Used in Providers.tsx around the whole app
 * First effect reads the saved theme from localStorage once when the app opens
 * Second effect adds or removes the dark class on the html tag and saves the theme
 */

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  /** Theme starts as light until the saved theme is read */
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};