import React, { useState } from "react";
import { Projects } from "./dataProjects";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/solid";

const CardProjects = () => {
  const [selectedBahasa, setSelectedBahasa] = useState([]);
  const [selectedTool, setSelectedTool] = useState([]);
  const filteredProjects = Projects.filter((project) => {
    if (selectedBahasa.length === 0 && selectedTool.length === 0) {
      return true;
    } else {
      const bahasaMatch = selectedBahasa.some((label) =>
        project.bahasa.includes(label)
      );
      const toolMatch = selectedTool.some((label) =>
        project.tools.includes(label)
      );

      return bahasaMatch || toolMatch;
    }
  });
  return (
    <>
      {/* Filter */}
      <div
        className={`bg-zinc-200 dark:bg-zinc-800 lg:max-w-[800px] mt-2 md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center backdrop-blur-md mb-4
    ${
      selectedBahasa.length === 0 && selectedTool.length === 0 ? "hidden" : ""
    }`}
      >
        <div className="justify-between flex-row flex items-center p-2">
          <div className="flex flex-wrap gap-2">
            {selectedBahasa.map((role, index) => (
              <ol className="flex flex-row">
                <div className="flex-row flex space-x-2 bg-violet-200 text-xs px-2.5 text-violet-600 dark:bg-violet-600 dark:text-violet-100 rounded-l-full">
                  <span className="">{role}</span>
                </div>

                <span
                  className=" cursor-pointer flex  bg-violet-200 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100 hover:bg-violet-300 hover:dark:bg-violet-500 rounded-r-full"
                  onClick={() => {
                    const newRole = [...selectedBahasa];
                    newRole.splice(index, 1);
                    setSelectedBahasa(newRole);
                  }}
                >
                  <XCircleIcon className="h-4 w-full" />
                </span>
              </ol>
            ))}

            {selectedTool.map((tooll, index) => (
              <ol className="flex flex-row">
                <div className="flex-row flex space-x-2 bg-violet-200 text-xs px-2.5 text-violet-600 dark:bg-violet-600 dark:text-violet-100 rounded-l-full">
                  <span className="">{tooll}</span>
                </div>

                <span
                  className=" cursor-pointer flex  bg-violet-200 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100 hover:bg-violet-300 hover:dark:bg-violet-500 rounded-r-full"
                  onClick={() => {
                    const newRole = [...selectedTool];
                    newRole.splice(index, 1);
                    setSelectedTool(newRole);
                  }}
                >
                  <XCircleIcon className="h-4 w-full" />
                </span>
              </ol>
            ))}
          </div>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => {
              setSelectedBahasa([]);
              setSelectedTool([]);
            }}
          >
            Clear
          </span>
        </div>
      </div>

      {/* End Filter */}
      <div className="bg-zinc-200 dark:bg-zinc-800 lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center backdrop-blur-md grid lg:grid-cols-2 gap-4 p-10 my-4">
        {filteredProjects.map((project) => {
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

                <span>
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                    {project.judul}
                  </h3>
                </span>
                <div className="mt-4 flex flex-wrap gap-1">
                  {project.bahasa.map((bhsa) => {
                    return (
                      <span
                        className="cursor-pointer whitespace-nowrap rounded-full bg-violet-200 px-2.5 py-0.5 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100"
                        key={project.id}
                        onClick={() =>
                          setSelectedBahasa([...selectedBahasa, bhsa])
                        }
                      >
                        {bhsa}
                      </span>
                    );
                  })}

                  {project.tools.map((tool) => {
                    return (
                      <span
                        className="cursor-pointer whitespace-nowrap rounded-full bg-violet-200 px-2.5 py-0.5 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100"
                        key={project.id}
                        onClick={() => setSelectedTool([...selectedTool, tool])}
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
