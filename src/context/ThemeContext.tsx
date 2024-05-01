"use client";

import { createContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  toggle: () => void;
};

type ThemeContextProps = {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ThemeContextProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage() || "light";
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};