"use client";

import React, { useEffect, useState } from "react";
import {
  XCircleIcon,
  PencilIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import UpdateProjectForm from "../admin/projects/[id]/page";
import { getSession } from "next-auth/react"; // pakai versi client
import ProjectForm from "../admin/projects/inputProjects/page";

const CardProjects = () => {
  const [session, setSession] = useState(null);
  const [selectedBahasa, setSelectedBahasa] = useState([]);
  const [selectedTool, setSelectedTool] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEdit = (id) => {
    setSelectedProject(id);
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
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
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

  const filteredProjects = projects.filter((project) => {
    if (selectedBahasa.length === 0 && selectedTool.length === 0) {
      return true;
    } else {
      const bahasaMatch = selectedBahasa.some((label) =>
        project.bahasa.includes(label)
      );
      const toolMatch = selectedTool.some((label) =>
        project.tools.includes(label)
      );

      return bahasaMatch || toolMatch;
    }
  });

  const ProjectSkeleton = () => (
    <div className="lg:max-w-[400px] m-auto rounded-xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse">
      <div className="rounded-[10px] bg-primary dark:bg-darkprimary p-4 sm:p-6">
        <div className="h-56 w-full bg-primary dark:bg-darkprimary mb-2 rounded" />
        <div className="h-3 w-32 bg-primary dark:bg-darkprimary mb-2 rounded" />
        <div className="h-4 w-48 bg-primary dark:bg-darkprimary mb-4 rounded" />
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 bg-primary dark:bg-darkprimary rounded-full" />
          <div className="h-5 w-12 bg-primary dark:bg-darkprimary rounded-full" />
          <div className="h-5 w-20 bg-primary dark:bg-darkprimary rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Filter */}
      <div
        className={`bg-primary dark:bg-darkprimary mb-5 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl items-center shadow-md
    ${
      selectedBahasa.length === 0 && selectedTool.length === 0 ? "hidden" : ""
    }`}
      >
        <div className="justify-between flex-row flex items-center p-2">
          <div className="flex flex-wrap gap-2">
            {selectedBahasa.map((role, index) => (
              <ol className="flex flex-row">
                <div className="flex-row flex space-x-2 bg-violet-200 text-xs px-2.5 text-violet-600 dark:bg-violet-600 dark:text-violet-100 rounded-l-full">
                  <span className="">{role}</span>
                </div>

                <span
                  className=" cursor-pointer flex  bg-violet-200 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100 hover:bg-violet-300 hover:dark:bg-violet-500 rounded-r-full"
                  onClick={() => {
                    const newRole = [...selectedBahasa];
                    newRole.splice(index, 1);
                    setSelectedBahasa(newRole);
                  }}
                >
                  <XCircleIcon className="h-4 w-4" />
                </span>
              </ol>
            ))}

            {selectedTool.map((tooll, index) => (
              <ol className="flex flex-row">
                <div className="flex-row flex space-x-2 bg-green-200 text-xs px-2.5 text-green-600 dark:bg-green-600 dark:text-green-100 rounded-l-full">
                  <span className="">{tooll}</span>
                </div>

                <span
                  className=" cursor-pointer flex bg-green-200 text-xs text-green-600 dark:bg-green-600 dark:text-green-100 hover:bg-green-300 hover:dark:bg-green-500 rounded-r-full"
                  onClick={() => {
                    const newRole = [...selectedTool];
                    newRole.splice(index, 1);
                    setSelectedTool(newRole);
                  }}
                >
                  <XCircleIcon className="h-4 w-4" />
                </span>
              </ol>
            ))}
          </div>
          <span
            className="cursor-pointer hover:underline"
            onClick={() => {
              setSelectedBahasa([]);
              setSelectedTool([]);
            }}
          >
            Clear
          </span>
        </div>
      </div>
      {/* End Filter */}
      {isSubmitting && <></>}
      <div className="lg:max-w-[800px] md:max-w-[600px] max-w-[430px] m-auto rounded-xl grid lg:grid-cols-2 gap-4 w-full h-full items-center">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
          : filteredProjects.map((project) => (
              <article
                className="card-glass relative flex w-full m-auto mt-2 px-3 py-1 text-xs text-text dark:text-darktext"
                key={project._id}
              >
                <div className="rounded-xl p-4 sm:p-6 h-96">
                  {session ? (
                    <button
                      onClick={() => handleEdit(project._id)} // panggil fungsi untuk buka form edit
                      className="absolute top-0 right-0 bg-button hover:bg-button/90 p-1 rounded-full"
                      title="Edit Project"
                    >
                      <PencilIcon className="h-5 w-5 text-primary dark:text-darkprimary" />
                    </button>
                  ) : (
                    <></>
                  )}
                  <Link href={`/projects/${project._id}`}>
                    <img
                      alt={project.judul}
                      src={project.foto?.[0]}
                      className="h-56 w-full rounded-md object-cover mb-2 cursor-pointer"
                    />
                  </Link>
                  <time
                    dateTime={project.tanggal}
                    className="animate__animated animate__bounce block text-xs text-text dark:text-gray-400"
                  >
                    {new Date(project.tanggal).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>

                  <span>
                    <Link
                      href={`/projects/${project._id}`}
                      className="animate__animated animate__bounce mt-0.5 text-lg font-medium text-headline dark:text-darkheadline hover:underline"
                    >
                      {project.judul}
                    </Link>
                  </span>
                  <div className="py-4 flex flex-wrap gap-2 border-t-text dark:border-t-darktext border-t-2 justify-center">
                    {project.bahasa.map((bhsa) => {
                      return (
                        <span
                          className="animate__animated animate__jackInTheBox cursor-pointer whitespace-nowrap rounded-full bg-violet-200 px-2.5 py-0.5 text-xs text-violet-600 dark:bg-violet-600 dark:text-violet-100 hover:bg-violet-300 hover:dark:bg-violet-500"
                          key={bhsa}
                          onClick={() =>
                            setSelectedBahasa([...selectedBahasa, bhsa])
                          }
                        >
                          {bhsa}
                        </span>
                      );
                    })}

                    {project.tools.map((tool) => {
                      return (
                        <span
                          className="animate__animated animate__jackInTheBox cursor-pointer whitespace-nowrap rounded-full bg-green-200 px-2.5 py-0.5 text-xs text-green-600 dark:bg-green-600 dark:text-green-100 hover:bg-green-300 hover:dark:bg-green-500"
                          key={tool}
                          onClick={() =>
                            setSelectedTool([...selectedTool, tool])
                          }
                        >
                          {tool}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}

        {/* add button */}
        {session ? (
          <div
            className="flex justify-center bg-primary/50 dark:bg-darkprimary/50 rounded-xl my-32 h-full shadow-lg
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
                Input Project
              </p>
              <ProjectForm onSuccess={setIsSuccess} />
            </div>
          </div>
        )}

        {/* EDIT */}
        {showEditForm && selectedProject && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur">
            <div className="bg-primary dark:bg-darkprimary p-6 rounded-lg max-w-md w-md w-full m-auto relative">
              <button
                className="absolute top-4 right-4 text-lg text-button hover:text-button/50"
                onClick={() => setShowEditForm(false)}
              >
                ✕
              </button>
              <p className="text-xl text-headline dark:text-darkheadline mb-4">
                Edit Project
              </p>
              <UpdateProjectForm
                projectId={selectedProject}
                onLoadingChange={setIsSubmitting}
                onSuccess={setIsSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CardProjects;
