"use client";
import React from "react";
import CardProjects from "./cardProjects";

export const metadata = {
  title: 'Projects',
}

const Projects = () => {
  return (
    <div className="bg bg-zinc-100 dark:bg-zinc-900 py-10 lg:h-screen">
      <CardProjects />
    </div>
  );
};

export default Projects;
