import Link from "next/link";
import React from "react";
import DarkMode from "./darkMode";

function Navbar() {
  return (
    <div>
      <nav
        aria-label="Site Nav"
        className="mx-auto flex max-w-3xl items-center justify-between p-4 bg-transparent"
      >
        <Link
          href="/"
          className="inline-flex h-10 w-20 items-center justify-center text-gray-700 dark:text-gray-50 font-righteous"
        >
          Tednih.
        </Link>

        <ul className="flex items-center gap-5 text-sm font-medium text-gray-700 dark:text-gray-50">
          <li>
            <Link
              className="relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-violet-600 before:transition hover:before:scale-x-100"
              href="/"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              className="relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-violet-600 before:transition hover:before:scale-x-100"
              href="/projects"
            >
              Projects
            </Link>
          </li>
          <li className="animate-bounce">
            <DarkMode />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
