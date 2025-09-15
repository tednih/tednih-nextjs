import { generateEntityMetadata, getEntity } from "@/lib/metadata";
import DetailProjects from "./projectDetail";

export async function generateMetadata({ params }) {
  return generateEntityMetadata("projects", params.id, "Projects");
}

export default async function ProjectDetailPage({ params }) {
  const project = await getEntity("projects", params.id);

  return (
    <>
      <DetailProjects project={project} />
    </>
  );
}
