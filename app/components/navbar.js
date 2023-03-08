import Link from "next/link";
import React from "react";
import DarkMode from "./darkMode";
import { ViewListIcon } from "@heroicons/react/solid";

function Navbar() {
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

          <div class="lg:hidden md:hidden">
            <button
              class="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
            >
              <span class="sr-only">Open menu</span>
              <ViewListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
