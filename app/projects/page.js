"use client";

import React from "react";
import { Router } from "react-router-dom";
import BreadCrumb from "../components/breadCrumb";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import CardProjects from "./cardProjects";

const Projects = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 lg:max-w-[1440px] m-auto">
      <Navbar />
      <BreadCrumb />

      <CardProjects />
      <Footer />
    </div>
  );
};

export default Projects;
