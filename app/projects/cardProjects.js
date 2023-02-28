import React from "react";
import { Projects } from "./dataProjects";
import Image from "next/image";
const CardProjects = () => {
  return (
    <>
      <div className="bg-zinc-200 dark:bg-zinc-800 lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center backdrop-blur-md grid lg:grid-cols-2 gap-4 p-10 my-4">
        {Projects.map((project) => {
          return (
            <article
              className="animate-background lg:max-w-[400px] m-auto rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-[length:400%_400%] p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25"
              key={project.id}
            >
              <div className="rounded-[10px] bg-zinc-100 dark:bg-zinc-900 p-4 sm:p-6">
                <Image
                  alt=""
                  src={project.foto}
                  className="h-56 w-full object-cover mb-2"
                />
                <time
                  dateTime={project.tanggal}
                  className="block text-xs text-gray-500 dark:text-gray-400"
                >
                  {project.tanggal}
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                    {project.judul}
                  </h3>
                </a>
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.bahasa.map((bhsa) => {
                    return (
                      <span
                        className="cursor-pointer whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100"
                        key={project.id}
                      >
                        {bhsa}
                      </span>
                    );
                  })}

                  {project.tools.map((tool) => {
                    return (
                      <span
                        className="cursor-pointer whitespace-nowrap rounded-full bg-violet-100 px-2.5 py-0.5 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100"
                        key={project.id}
                      >
                        {tool}
                      </span>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default CardProjects;
