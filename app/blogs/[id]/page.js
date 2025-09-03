"use client";

import React, { useEffect, useState } from "react";
// import { Blogs } from "../dataBlogs";
import Image from "next/image";

const DetailBlogs = ({ params }) => {
  const { id } = params;
  const [blog, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  return (
    <>
      <section className="overflow-hidden sm:grid sm:grid-cols-2 border-b-4 ">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24 items-center m-auto">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-text dark:text-darktext md:text-3xl">
              {blog.judul}
            </h2>

            <p className="text-text dark:text-gray-300 md:mt-4 md:block">
              {blog.deskripsi}
            </p>
          </div>
        </div>

        <img
          alt={blog.judul}
          src={blog.foto?.[0]}
          className="h-56 w-full object-cover sm:h-full"
        />
        <img
          alt={blog.judul}
          src={blog.foto?.[1]}
          className="h-56 w-full object-cover sm:h-full"
        />
      </section>
    </>
  );
};

export default DetailBlogs;
