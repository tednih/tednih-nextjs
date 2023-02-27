import React from "react";

const Footer = () => {
  return (
    <div className="absolute inset-x-0 bottom-0">
      <footer
        aria-label="Site Footer"
        className="bg-gray-50 dark:bg-zinc-900 mx-auto flex lg:max-w-[1440px] items-center justify-between p-4 border-t-2 border-zinc-900 dark:border-gray-50"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center sm:justify-start">
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-50 lg:mt-0">
              Made using Next.js and Tailwind CSS. Hosted on Vercel.
            </p>
          </div>

          <div>
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-50 lg:mt-0">
              &copy; 2023. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
