import Link from "next/link";
import React from "react";

const Projects = () => {
  return (
    <div>
      <p>Halaman Project</p>
      <p>
        <Link
          className="relative font-medium text-gray-500 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100"
          href="/"
        >
          Home
        </Link>
      </p>
    </div>
  );
};

export default Projects;
