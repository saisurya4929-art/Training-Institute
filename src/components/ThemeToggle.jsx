import React from "react";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
    </button>
  );
};

export default ThemeToggle;