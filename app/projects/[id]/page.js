"use client";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
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
      <Navbar />
      <section className="lg:max-w-[1440px] m-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:grid sm:grid-cols-2 sm:items-center">
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
          className="h-full w-full object-fit rounded-md"
        />
      </section>
      <Footer />
    </div>
  );
};

export default DetailProjects;
