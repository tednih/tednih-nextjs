"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const DarkMode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <div className="relative group z-[1000]">
          <SunIcon
            className="w-5 h-5"
            role="button"
            onClick={() => setTheme("light")}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 
               text-xs text-text dark:text-darktext rounded-xl shadow-lg
               backdrop-blur-md bg-primary/10 dark:bg-darkprimary/10 border border-white/20
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[2000]"
          >
            Light Mode
          </span>
        </div>
      );
    } else {
      return (
        <div className="relative group z-[1000]">
          <MoonIcon
            className="w-5 h-5"
            role="button"
            onClick={() => setTheme("dark")}
          />
          <span
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 
               text-xs text-text dark:text-darktext rounded-xl shadow-lg
               backdrop-blur-md bg-primary/10 dark:bg-darkprimary/10 border border-white/20
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[2000]"
          >
            Dark Mode
          </span>
        </div>
      );
    }
  };

  return (
    <>
      <div>{renderThemeChanger()}</div>
    </>
  );
};

export default DarkMode;
