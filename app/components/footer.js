import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer
        aria-label="Site Footer"
        className="bg-primary dark:bg-darkprimary mx-auto flex lg:max-w-[1440px] items-center justify-between p-0 m-0"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start">
            <p className="mt-4 text-center text-sm text-text dark:text-darktext lg:mt-0">
              Made using Next.js and Tailwind CSS. Hosted on Vercel.
            </p>
          </div>

          <div>
            <p className="mt-4 text-center text-sm text-text dark:text-darktext lg:mt-0">
              &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
