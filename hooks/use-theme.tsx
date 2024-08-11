"use client";
import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
