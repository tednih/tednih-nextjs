import React from "react";

const CardProjects = () => {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center backdrop-blur-md grid lg:grid-cols-2 gap-4 p-10">
      <article className="animate-background lg:max-w-[400px] m-auto rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25">
        <div className="rounded-[10px] bg-zinc-100 dark:bg-zinc-900 p-4 sm:p-6">
          <img
            alt="Office"
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-56 w-full object-cover mb-2"
          />
          <time
            datetime="2022-10-10"
            className="block text-xs text-gray-500 dark:text-gray-400"
          >
            10th Oct 2022
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
              How to center an element using JavaScript and jQuery
            </h3>
          </a>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              Snippet
            </span>

            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              JavaScript
            </span>
          </div>
        </div>
      </article>

      {/*  */}
      <article className="animate-background lg:max-w-[400px] m-auto rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25">
        <div className="rounded-[10px] bg-zinc-100 dark:bg-zinc-900 p-4 sm:p-6">
          <img
            alt="Office"
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-56 w-full object-cover mb-2"
          />
          <time
            datetime="2022-10-10"
            className="block text-xs text-gray-500 dark:text-gray-400"
          >
            10th Oct 2022
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
              How to center an element using JavaScript and jQuery
            </h3>
          </a>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              Snippet
            </span>

            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              JavaScript
            </span>
          </div>
        </div>
      </article>
      <article className="animate-background lg:max-w-[400px] m-auto rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25">
        <div className="rounded-[10px] bg-zinc-100 dark:bg-zinc-900 p-4 sm:p-6">
          <img
            alt="Office"
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="h-56 w-full object-cover mb-2"
          />
          <time
            datetime="2022-10-10"
            className="block text-xs text-gray-500 dark:text-gray-400"
          >
            10th Oct 2022
          </time>

          <a href="#">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
              How to center an element using JavaScript and jQuery
            </h3>
          </a>

          <div className="mt-4 flex flex-wrap gap-1">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              Snippet
            </span>

            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600 dark:bg-purple-600 dark:text-purple-100">
              JavaScript
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardProjects;
