"use client";

import React from "react";
import { Blogs } from "../dataBlogs";
import Image from "next/image";

const DetailBlogs = ({ params }) => {
  const { id } = params;
  const detail = Blogs.find((blog) => {
    return blog.id === parseInt(id);
  });
  if (!detail) {
    return <div>Error: Blog not found</div>;
  }
  return (
    <>
      <section className="overflow-hidden bg-zinc-100 dark:bg-zinc-900 sm:grid sm:grid-cols-2 border-b-4 ">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 items-center m-auto">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
              {detail.judul}
            </h2>

            <p className="text-gray-500 dark:text-gray-300 md:mt-4 md:block">
              {detail.deskripsi}
            </p>
          </div>
        </div>

        <Image
          alt="Student"
          src={detail.foto.Foto1}
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
      <section className="overflow-hidden bg-zinc-900 dark:bg-zinc-100 sm:grid sm:grid-cols-2 border-b-4">
        <Image
          alt="Student"
          src={detail.foto.Foto2}
          className="h-56 w-full object-cover sm:h-full"
        />

        <div className="p-8 md:p-12 lg:px-16 lg:py-24 items-center m-auto">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-white dark:text-gray-900 md:text-3xl">
              {detail.judul}
            </h2>

            <p className="text-gray-300 dark:text-gray-500 md:mt-4 md:block">
              {detail.deskripsi2}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailBlogs;
