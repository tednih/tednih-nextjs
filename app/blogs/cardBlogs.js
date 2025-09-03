"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "animate.css";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/solid";
import { getSession } from "next-auth/react"; // pakai versi client
import UpdateBlogForm from "../admin/blogs/[id]/page";
import BlogForm from "../admin/blogs/inputBlogs/page";

const CardBlogs = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEdit = (id) => {
    setSelectedBlog(id);
    setShowEditForm(true);
  };

  useEffect(() => {
    const fetchSession = async () => {
      const s = await getSession(); // ini versi client-side
      setSession(s);
    };

    fetchSession();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // fetch pertama kali
  useEffect(() => {
    fetchData();
  }, []);

  // kalau sukses update → refetch ulang
  useEffect(() => {
    if (isSuccess) {
      setShowEditForm(false);
      // setShowAddForm(false);
      fetchData();
      setIsSuccess(false);
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl lg:grid-cols-2 gap-4 w-full h-full items-center">
      {isSubmitting && <></>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        blogs.map((blog) => {
          return (
            <article
              className="relative flex w-auto p-4 rounded-lg"
              key={blog._id}
            >
              {session ? (
                <button
                  onClick={() => handleEdit(blog._id)} // panggil fungsi untuk buka form edit
                  className="absolute top-2 right-2 bg-button hover:bg-button/90 p-1 rounded-full h-7 z-10"
                  title="Edit Project"
                >
                  <PencilIcon className="h-5 w-5 text-primary dark:text-darkprimary" />
                </button>
              ) : (
                <></>
              )}
              <div className="flex animate-background m-auto card-glass mb-4">
                <div className="absolute inset-0 md:hidden">
                  <img
                    alt={blog.judul}
                    src={blog.foto?.[0]}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-primary/60 dark:bg-darkprimary/60 rounded-xl"></div>
                </div>
                <div className="border-l z-10 border-primary dark:border-darkprimary rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time
                    dateTime={blog.tanggal}
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase dark:text-primary text-darkprimary"
                  >
                    <span>
                      {new Date(blog.tanggal).toLocaleDateString("id-ID", {
                        year: "numeric",
                      })}
                    </span>
                    <span className="w-px flex-1 bg-text dark:bg-darktext"></span>
                    <span>
                      {new Date(blog.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                      })}
                    </span>
                  </time>
                </div>

                <div className="hidden md:block sm:basis-56">
                  <img
                    alt={blog.judul}
                    src={blog.foto?.[0]}
                    className="h-full w-full object-cover"
                    layout="responsive"
                  />
                </div>

                <div className="flex flex-col justify-between w-full z-10">
                  <div className="border-s border-gray-900/10 p-4 dark:border-white/10 sm:!border-l-transparent sm:p-6">
                    <Link href={`/blogs/${blog._id}`}>
                      <h3 className="font-bold uppercase dark:text-primary text-darkprimary">
                        {blog.judul}
                      </h3>
                    </Link>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-text dark:text-darktext">
                      {blog.deskripsi.length > 200
                        ? blog.deskripsi.slice(0, 200) + "..."
                        : blog.deskripsi}
                    </p>
                  </div>

                  <div className="sm:flex sm:items-end sm:justify-end">
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="rounded-br-xl border bg-button/50 hover:bg-button border-primary dark:border-darkprimary block px-5 py-3 text-center text-xs font-bold uppercase text-text dark:text-darktext transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })
      )}
      {/* add button */}
      {session ? (
        <div
          className="flex justify-center bg-primary/50 dark:bg-darkprimary/50 rounded-xl my-32 shadow-lg
          "
        >
          <button
            className="w-max h-max px-3 p-1 items-center m-auto
               text-xs text-primary dark:text-darkprimary rounded-xl 
               backdrop-blur-md bg-text/50 dark:bg-darktext/50 hover:bg-text/30 dark:hover:bg-darktext/30 border border-primary/20 dark:border-darkprimary/20 transition-opacity duration-200"
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircleIcon className="w-6 h-6" />
            Add
          </button>
        </div>
      ) : (
        <></>
      )}

      {/* ADD */}
      {showAddForm && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="relative bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-full m-auto shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
              onClick={() => setShowAddForm(false)}
            >
              ✕
            </button>

            {/* Form */}
            <p className="text-xl text-headline dark:text-darkheadline mb-4">
              Input Blog
            </p>
            <BlogForm onSuccess={setIsSuccess} />
          </div>
        </div>
      )}

      {/* EDIT */}
      {showEditForm && selectedBlog && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
          <div className="relative bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-full m-auto shadow-lg">
            <button
              className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
              onClick={() => setShowEditForm(false)}
            >
              ✕
            </button>
            <p className="text-xl text-headline dark:text-darkheadline mb-4">
              Edit Blog
            </p>
            <UpdateBlogForm
              blogId={selectedBlog}
              onLoadingChange={setIsSubmitting}
              onSuccess={setIsSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBlogs;
