"use client";
import Navbar from "@/app/components/navbar";
import React from "react";
import { Projects } from "../dataProjects";

const DetailProjects = ({ params }) => {
  const { id } = params;
  const detail = Projects.find((project) => {
    return project.id === parseInt(id);
  });
  if (!detail) {
    return <div>Error: Project not found</div>;
  }
  return (
    <div>
      <Navbar />
      <section className="overflow-hidden bg-zinc-200 dark:bg-zinc-800 sm:grid sm:grid-cols-2 sm:items-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {detail.judul}
            </h2>

            <p className="hidden text-gray-500 dark:text-gray-400 md:mt-4 md:block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
              egestas tempus tellus etiam sed. Quam a scelerisque amet
              ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
              quisque ut interdum tincidunt duis.
            </p>
          </div>
        </div>

        <img
          alt=""
          src={detail.foto}
          className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%_-_4rem)] md:rounded-tl-[60px]"
        />
      </section>
    </div>
  );
};

export default DetailProjects;
