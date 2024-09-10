import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Toggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const changeTheme = () => {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  return (
    <button onClick={changeTheme}>
      {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-900" />}
    </button>
  );
}