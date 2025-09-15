import { generateEntityMetadata, getEntity } from "@/lib/metadata";
import DetailBlogs from "./blogDetail";

export async function generateMetadata({ params }) {
  return generateEntityMetadata("blogs", params.id, "Blogs");
}

export default async function BlogDetailPage({ params }) {
  const blog = await getEntity("blogs", params.id);

  return (
    <>
      <DetailBlogs blog={blog} />
    </>
  );
}
