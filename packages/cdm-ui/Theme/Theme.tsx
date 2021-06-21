import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import { BuiltInBreakpoints } from "./useBreakpoint";

export type ThemeContextShape = ThemeProviderProps & {
  rootFontSize: number
  breakpoints: BuiltInBreakpoints
}

export const ThemeContext = createContext<ThemeContextShape>({
  rootFontSize: 16,
  breakpoints: null
});

export type ThemeProviderProps = {
  breakpoints?: BuiltInBreakpoints
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ breakpoints = {}, children }) => {
  const allBreakpoints = {
    xs: 380,
    sm: 480,
    md: 768,
    lg: 960,
    xl: 1024,
    xxl: 1200,
    ...breakpoints
  }
  const [rootFontSize, setRootFontSize] = useState(16);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rawFontSize = window.getComputedStyle(window.document.body).getPropertyPriority('font-size');
      const fontSize = parseFloat(rawFontSize);
      setRootFontSize(fontSize);
    }
  }, []);
  
  return (
    <ThemeContext.Provider value={{ 
      rootFontSize, 
      breakpoints: allBreakpoints 
    }}>
      <Head>
        <style id="cdm-theme">
        {`
        :root {${Object.keys(allBreakpoints).map(name => `
            --cdm-breakpoint-${name}: ${allBreakpoints[name]};
          `).join('')}}
        `}
        </style>
      </Head>
      {children}
    </ThemeContext.Provider>
  );
}