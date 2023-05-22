import React from "react";
import { Blogs } from "./dataBlogs";
import Image from "next/image";
import Link from "next/link";

const CardBlogs = () => {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center gap-4 p-10">
      {Blogs.map((blog) => {
        return (
          <article
            className="flex animate-background m-auto rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition [animation-duration:_6s] hover:shadow-sm dark:shadow-gray-700/25 mb-4"
            key={blog.id}
          >
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
              <time
                datetime={blog.tanggal}
                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-600"
              >
                <span>{blog.tanggal.split(" ").pop()}</span>
                <span className="w-px flex-1 bg-gray-600"></span>
                <span>{blog.tanggal.split(" ").slice(0, -1).join(" ")}</span>
              </time>
            </div>

            <div className="hidden sm:block sm:basis-56">
              <Image
                alt="Guitar"
                src={blog.foto.Foto1}
                className="aspect-square h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between bg-zinc-100 dark:bg-zinc-900 rounded-tr-xl rounded-br-xl">
              <div className="border-s border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6">
                <Link href={`/blog/${blog.id}`}>
                  <h3 className="font-bold uppercase text-gray-900 dark:text-white">
                    {blog.judul}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 dark:text-gray-200">
                  {blog.deskripsi}
                </p>
              </div>

              <div className="sm:flex sm:items-end sm:justify-end">
                <Link
                  href={`/blog/${blog.id}`}
                  className="rounded-br-xl block bg-yellow-400 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-500"
                >
                  Read Blog
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CardBlogs;
