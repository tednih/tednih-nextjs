import React from "react";
import CardProjects from "./cardProjects";
import { generateEntityMetadata } from "@/lib/metadata";

export const metadata = await generateEntityMetadata(
  "projects",
  null,
  "Projects"
);

const Projects = () => {
  return (
    <div>
      <CardProjects />
    </div>
  );
};

export default Projects;
