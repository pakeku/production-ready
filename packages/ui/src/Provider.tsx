"use client";

import React, { ReactNode, createContext, useContext } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";
import { Switch } from "./switch/Switch";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within UiProvider");
  }
  return context;
}

export function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) => {
        setTheme(checked ? "dark" : "light");
      }}
    />
  );
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <TamaguiProvider config={config}>
        <Theme name={theme}>{children}</Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
}
