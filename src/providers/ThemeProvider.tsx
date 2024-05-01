"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useContext(ThemeContext) is undefined, make sure this component is wrapped in a ThemeContext.Provider');
  }
  const { theme } = themeContext;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }
};

export default ThemeProvider;