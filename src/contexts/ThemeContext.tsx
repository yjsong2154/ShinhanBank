import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { DefaultTheme } from "styled-components";
import { lightTheme, darkTheme, customTheme } from "../styles/theme";

type ThemeName = "light" | "dark" | "custom";
type ThemeContextType = {
  theme: DefaultTheme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentThemeName, setCurrentThemeName] = useState<ThemeName>("light");

  const themeMap = {
    light: lightTheme,
    dark: darkTheme,
    custom: customTheme,
  };

  const currentTheme = themeMap[currentThemeName];

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeName: currentThemeName,
        setTheme: setCurrentThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
