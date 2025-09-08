"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import DarkMode from "./darkMode";
import { MenuIcon, XIcon, LogoutIcon, LoginIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();

  const handleLogin = (e) => {
    e.preventDefault(); // supaya Link tidak navigasi biasa
    signIn(undefined, {
      callbackUrl: pathname, // kembali ke halaman sekarang
    });
  };

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

  const closeMenu = () => {
    setIsOpen(false);
  };
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

  const navClasses = `fixed top-0 lg:max-w-[1440px] w-full bg-primary dark:bg-darkprimary z-20 shadow-md transition-all duration-300 ${
    isScrolled
      ? "bg-primary dark:bg-darkprimary md:bg-opacity-50 md:dark:bg-opacity-50"
      : ""
  }`;

  // End Fixed Nav When Scroll

  return (
    <header aria-label="Site Header" className={`${navClasses}`}>
      <div className="mx-auto md:mx-5 p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1 font-righteous">
            <Link href="/">Tednih.</Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            <Link
              className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
              href="/blogs"
            >
              Blogs
            </Link>
            <Link
              className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
              href="/chatAI"
            >
              Chat AI ⭐
            </Link>
          </nav>
          <div className="animate__animated animate__shakeY flex-1 items-center justify-end gap-4 flex z-30">
            <DarkMode />
            {session ? (
              <div className="relative group z-[1000]">
                <LogoutIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: pathname })}
                />
                <span
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 
               text-xs text-text dark:text-darktext rounded-xl shadow-lg
               backdrop-blur-md bg-primary/10 dark:bg-darkprimary/10 border border-primary/20 dark:border-darkprimary/20
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[2000]"
                >
                  Logout
                </span>
              </div>
            ) : (
              <div className="relative group z-[1000]">
                <Link href="#" onClick={handleLogin}>
                  <LoginIcon className="h-6 w-6 cursor-pointer" />
                </Link>
                <span
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 
               text-xs text-text dark:text-darktext rounded-xl shadow-lg
               backdrop-blur-md bg-primary/10 dark:bg-darkprimary/10 border border-white/20
               opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[2000]"
                >
                  Login
                </span>
              </div>
            )}
          </div>

          {/* NAVBAR MODE HP */}
          <div ref={menuRef} className="md:hidden items-center flex">
            <button
              className="dark:text-darkheadline text-headline focus:outline-none"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            {isOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="absolute right-0 top-14 backdrop-blur-sm bg-primary/20 dark:bg-darkprimary/20 w-screen h-screen z-10"
                  onClick={closeMenu} // Klik di luar sidebar
                />

                {/* Sidebar */}
                <div
                  className="absolute right-0 top-14 w-60 h-[calc(100vh-3.5rem)] bg-primary dark:bg-darkprimary flex flex-col justify-between shadow-md z-20"
                  onClick={(e) => e.stopPropagation()} // Mencegah klik di sidebar menutup menu
                >
                  {/* bagian atas nav */}
                  <ul className="text-center mt-8">
                    <li className="mb-6">
                      <Link
                        className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
                        href="/projects"
                      >
                        Projects
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
                        href="/blogs"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li className="mb-6">
                      <Link
                        className="text-text dark:text-darktext relative font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-darkprimary dark:before:bg-primary before:transition hover:before:scale-100"
                        href="/chatAI"
                      >
                        Chat AI{" "}
                      </Link>
                      ⭐
                    </li>
                  </ul>
                  {/* bagian tengah nav */}
                  <div className="m-auto top-0 w-32">
                    <Link
                      className="w-full mb-2 inline-flex justify-center gap-2 rounded ring-1 ring-darkprimary dark:ring-primary px-5 py-3 text-sm font-medium text-text bg-primary dark:bg-darkprimary dark:text-darktext hover:opacity-80 transition"
                      href="https://github.com/tednih"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          cli="evenodd"
                        ></path>
                      </svg>
                    </Link>
                    <Link
                      className="w-full mb-2 inline-flex justify-center gap-2 rounded ring-1 ring-darkprimary dark:ring-primary px-5 py-3 text-sm font-medium text-text bg-primary dark:bg-darkprimary dark:text-darktext hover:opacity-80 transition"
                      href="https://www.linkedin.com/in/tednih/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Linkedin
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18.72 3.99997H5.37C5.19793 3.99191 5.02595 4.01786 4.86392 4.07635C4.70189 4.13484 4.55299 4.22471 4.42573 4.34081C4.29848 4.45692 4.19537 4.59699 4.12232 4.75299C4.04927 4.909 4.0077 5.07788 4 5.24997V18.63C4.01008 18.9901 4.15766 19.3328 4.41243 19.5875C4.6672 19.8423 5.00984 19.9899 5.37 20H18.72C19.0701 19.9844 19.4002 19.8322 19.6395 19.5761C19.8788 19.32 20.0082 18.9804 20 18.63V5.24997C20.0029 5.08247 19.9715 4.91616 19.9078 4.76122C19.8441 4.60629 19.7494 4.466 19.6295 4.34895C19.5097 4.23191 19.3672 4.14059 19.2108 4.08058C19.0544 4.02057 18.8874 3.99314 18.72 3.99997ZM9 17.34H6.67V10.21H9V17.34ZM7.89 9.12997C7.72741 9.13564 7.5654 9.10762 7.41416 9.04768C7.26291 8.98774 7.12569 8.89717 7.01113 8.78166C6.89656 8.66615 6.80711 8.5282 6.74841 8.37647C6.6897 8.22474 6.66301 8.06251 6.67 7.89997C6.66281 7.73567 6.69004 7.57169 6.74995 7.41854C6.80986 7.26538 6.90112 7.12644 7.01787 7.01063C7.13463 6.89481 7.2743 6.80468 7.42793 6.74602C7.58157 6.68735 7.74577 6.66145 7.91 6.66997C8.07259 6.66431 8.2346 6.69232 8.38584 6.75226C8.53709 6.8122 8.67431 6.90277 8.78887 7.01828C8.90344 7.13379 8.99289 7.27174 9.05159 7.42347C9.1103 7.5752 9.13699 7.73743 9.13 7.89997C9.13719 8.06427 9.10996 8.22825 9.05005 8.3814C8.99014 8.53456 8.89888 8.6735 8.78213 8.78931C8.66537 8.90513 8.5257 8.99526 8.37207 9.05392C8.21843 9.11259 8.05423 9.13849 7.89 9.12997ZM17.34 17.34H15V13.44C15 12.51 14.67 11.87 13.84 11.87C13.5822 11.8722 13.3313 11.9541 13.1219 12.1045C12.9124 12.2549 12.7546 12.4664 12.67 12.71C12.605 12.8926 12.5778 13.0865 12.59 13.28V17.34H10.29V10.21H12.59V11.21C12.7945 10.8343 13.0988 10.5225 13.4694 10.3089C13.84 10.0954 14.2624 9.98848 14.69 9.99997C16.2 9.99997 17.34 11 17.34 13.13V17.34Z"
                          cli="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                  {/* bagian bawah nav */}
                  <div>
                    <p className="mt-4 text-center text-sm text-text dark:text-darktext lg:mt-0">
                      &copy; 2023. All rights reserved.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
