"use client";
import Link from "next/link";
import React, { useState } from "react";
import DarkMode from "./darkMode";
import { MenuIcon, XIcon } from "@heroicons/react/solid";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      aria-label="Site Header"
      className="bg-zinc-100 dark:bg-zinc-900 lg:max-w-[1440px] m-auto"
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

          <div class="flex-1 items-center justify-end gap-4 sm:flex animate-bounce">
            <DarkMode />
          </div>

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
            <div className="absolute top-12 left-0 w-full h-full z-50">
              <div className="p-8 text-gray-700">
                <ul>
                  <li>
                    <Link
                      class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                      href="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                      href="/projects"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      class="text-gray-700 dark:text-gray-100 relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-zinc-900 dark:before:bg-zinc-100 before:transition hover:before:scale-100"
                      href="/"
                    >
                      About
                    </Link>
                  </li>
                  <li>
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
    </header>
  );
}

export default Navbar;
