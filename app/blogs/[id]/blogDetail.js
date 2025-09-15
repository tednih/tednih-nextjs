"use client";

import Carousel from "@/app/components/carousel";
import React, { useEffect, useState } from "react";

const DetailBlogs = ({ blog }) => {
  const id = blog?._id;
  const [blogs, setBlogs] = useState([]);
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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-text dark:text-darktext">
        Loading...
      </div>
    );
  }

  return (
    <div className="lg:max-w-[1440px] m-auto">
      <section className="lg:grid lg:grid-cols-2 lg:items-center lg:py-20 gap-6">
        {/* Konten Teks */}
        <div className="relative p-6 md:p-10 lg:px-14 lg:py-14">
          {/* Glass Effect Box */}
          <div className="rounded-xl card-glass shadow-xl p-8 transition hover:shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-headline dark:text-darkheadline mb-4">
              {blog.judul}
            </h2>
            <p className="text-base md:text-lg text-text dark:text-darktext leading-relaxed text-justify">
              {blog.deskripsi}
            </p>

            {/* Tambah meta info */}
            <div className="my-4 flex flex-wrap gap-3 text-sm text-text dark:text-darktext">
              <span className="px-3 py-1 rounded-full card-glass text-text dark:text-darktext">
                {blog.kategori || "General"}
              </span>
              <span className="px-3 py-1 rounded-full card-glass text-text dark:text-darktext">
                {blog.tanggal
                  ? new Date(blog.tanggal).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No Date"}
              </span>
            </div>
            {/* Carousel */}
            <div className="relative flex justify-center items-center">
              <Carousel images={blog.foto} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailBlogs;
