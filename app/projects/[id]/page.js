"use client";

import Image from "next/image";
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
      <section className="lg:max-w-[1440px] m-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900 lg:grid lg:grid-cols-2 lg:items-center lg:py-16">
        <div className="p-8 md:p-12 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {detail.judul}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 md:mt-4 ">
              {detail.deskripsi}
            </p>
          </div>
        </div>

        <Image
          alt=""
          src={detail.foto}
          className="lg:h-full lg:w-full h-[300px] w-[600px] m-auto object-fit items-center rounded-md"
        />
      </section>
    </div>
  );
};

export default DetailProjects;
