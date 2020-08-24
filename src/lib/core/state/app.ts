import { createContext } from "react";

export type ColorSchemes = "dark" | "light";
export type SetColorScheme = (scheme: ColorSchemes) => void;

export interface AppState {
  colorScheme: ColorSchemes
  setColorScheme: SetColorScheme
}

export const AppStateContext = createContext<AppState>({
  colorScheme: "light",
  setColorScheme: null
});

export const AppStateProvider = AppStateContext.Provider;

export const AppStateConsumer = AppStateContext.Consumer;

export default AppStateContext;