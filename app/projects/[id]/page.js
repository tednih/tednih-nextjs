import { Projects } from "../dataProjects";
import React from "react";

export async function getStaticPaths() {
  const paths = Projects.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = Projects.find((p) => p.id.toString() === params.id);

  return {
    props: { project },
  };
}

const DetailProject = ({ params }) => {
  return (
    <div>
      <b>detail PROJECT {params.id}</b>
      <p>{params.judul}</p>
    </div>
  );
};

export default DetailProject;
