import { Projects } from "../dataProjects";

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

function ProjectDetail({ params }) {
  {
    return (
      <>
        <b>detail PROJECT {params.id}</b>
      </>
    );
  }
}

export default ProjectDetail;
