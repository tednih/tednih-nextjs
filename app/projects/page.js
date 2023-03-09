"use client";

import React from "react";
import { Router } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";

import CardProjects from "./cardProjects";

const Projects = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 lg:max-w-[1440px] m-auto">
      <CardProjects />
    </div>
  );
};

export default Projects;
