"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import DarkMode from "./darkMode";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Navbar() {
  // Ketika Klick diluar Burger Button akan menutup burger button
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);
  // Akhir Ketika Klick diluar Burger Button akan menutup burger button

  // Fixed Nav When Scroll
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClasses = `top-0 w-full ${
    isScrolled ? "fixed backdrop-blur-md" : "bg-zinc-100 dark:bg-zinc-900"
  }`;
  const burgerScroll = `${isScrolled ? "bg-gray-500 " : ""}`;
  // End Fixed Nav When Scroll

  return (
    <header
      aria-label="Site Header"
      className={`lg:max-w-[1440px] m-auto bg-blend-saturation z-10 ${navClasses}`}
    >
      <div class="mx-auto max-w-screen-xl p-4 ">
        <div class="flex items-center justify-between gap-4 lg:gap-10">
          <div class="flex lg:w-0 lg:flex-1 font-righteous">
            <Link href="/">Tednih.</Link>
          </div>

          <nav
            aria-label="Site Nav"
            class="hidden gap-8 text-sm font-medium md:flex"
          >
            <Link
              class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
              href="/projects"
            >
              About
            </Link>
            <Link
              class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
              href="/projects"
            >
              Blog
            </Link>
          </nav>

          <div class="flex-1 items-center justify-end gap-4 flex animate-bounce">
            <DarkMode />
          </div>
          <div ref={menuRef}>
            <button
              className="block md:hidden dark:text-white text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <div
                className={`absolute right-5 top-16 backdrop-blur-md w-60 h-50 rounded-md border border-gray-700 z-50 ${burgerScroll}`}
              >
                <div className="pt-10">
                  <ul className="text-center ">
                    <li className="mb-8">
                      <Link
                        class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mb-8">
                      <Link
                        class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                        href="/projects"
                      >
                        Projects
                      </Link>
                    </li>
                    <li className="mb-8">
                      <Link
                        class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                        href="/"
                      >
                        About
                      </Link>
                    </li>
                    <li className="mb-8">
                      <Link
                        class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                        href="/"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
