"use client";

import React from "react";
import BreadCrumb from "../components/breadCrumb";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import CardProjects from "./cardProjects";
// import FilterLabel from "./filterLabel";

const Projects = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 lg:max-w-[1440px] m-auto">
      <Navbar />
      <BreadCrumb />

      {/* <FilterLabel /> */}
      <CardProjects />
      <Footer />
    </div>
  );
};

export default Projects;
