"use client";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-button dark:bg-darkbutton text-text dark:text-darktext shadow-lg hover:bg-button/80 transition-all duration-300"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
    )
  );
}
