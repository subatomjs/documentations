import { useContext, createContext } from "react";
export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
