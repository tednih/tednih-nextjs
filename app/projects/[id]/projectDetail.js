"use client";

import React, { useEffect, useState } from "react";
import Carousel from "@/app/components/carousel";

const DetailProjects = ({ project }) => {
  const id = project?._id;
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProjects(data.projects);
      } catch (err) {
        console.error("Gagal ambil data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-text dark:text-darktext">
        Loading...
      </div>
    );
  }
  if (!project) {
    return <p className="text-red-500">❌ Data project tidak tersedia</p>;
  }

  return (
    <div className="lg:max-w-[1440px] m-auto">
      <section className="lg:grid lg:grid-cols-2 lg:items-center lg:py-20 gap-6">
        {/* Konten Teks */}
        <div className="relative p-6 md:p-10 lg:px-14 lg:py-14">
          {/* Glass Effect Box */}
          <div className="rounded-xl card-glass shadow-xl p-8 transition hover:shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-headline dark:text-darkheadline mb-4">
              {projects.judul}
            </h2>
            <p className="text-base md:text-lg text-text dark:text-darktext leading-relaxed text-justify">
              {projects.deskripsi}
            </p>

            {/* Tambah meta info */}
            <div className="my-4 flex flex-wrap gap-3 text-sm text-text dark:text-darktext">
              <span className="px-3 py-1 rounded-full card-glass text-text dark:text-darktext">
                {projects.kategori || "General"}
              </span>
              <span className="px-3 py-1 rounded-full card-glass text-text dark:text-darktext">
                {projects.tanggal
                  ? new Date(projects.tanggal).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No Date"}
              </span>
            </div>
            {/* Carousel */}
            <div className="relative flex justify-center items-center">
              <Carousel images={projects.foto} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailProjects;
