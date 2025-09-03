"use client";

// import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { Projects } from "../dataProjects";
import Carousel from "@/app/components/carousel";

const DetailProjects = ({ params }) => {
  const { id } = params;
  const [projects, setProjects] = useState([]);
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
  return (
    <div className="lg:max-w-[1440px] lg:h-screen m-auto overflow-hidden">
      <section className="lg:grid lg:grid-cols-2 lg:items-center lg:py-16">
        <div className="p-8 md:p-12 lg:px-16 lg:py-14">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-text dark:text-darktext md:text-3xl">
              {projects.judul}
            </h2>

            <p className="text-text dark:text-gray-400 md:mt-4 ">
              {projects.deskripsi}
            </p>
          </div>
        </div>
        <Carousel images={projects.foto} />
      </section>
    </div>
  );
};

export default DetailProjects;
