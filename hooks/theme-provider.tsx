import React, { createContext } from "react";
import useData from "./use-data";

export const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: any) => {
  const allContext = useData();
  return (
    <ThemeContext.Provider value={allContext}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
