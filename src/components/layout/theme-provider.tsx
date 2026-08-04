"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";

/**
 * Wraps the app so any component can read/set light vs. dark mode.
 * Uses the "class" strategy — next-themes toggles a `dark` class on <html>,
 * which is what our Tailwind config (darkMode: ["class"]) expects.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}
