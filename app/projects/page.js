"use client";
import React from "react";
import CardProjects from "./cardProjects";

const Projects = () => {
  return (
    <>
      <title>Projects | Tednih.</title>
      <div className="bg bg-zinc-100 dark:bg-zinc-900 py-10">
        <CardProjects />
      </div>
    </>
  );
};

export default Projects;
