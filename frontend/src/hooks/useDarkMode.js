import { useState, useEffect, useCallback } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  ); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTheme !== null) {
      setIsDarkMode(JSON.parse(savedTheme)); 
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode)); 
      return newMode;
    });
  }, []);

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
