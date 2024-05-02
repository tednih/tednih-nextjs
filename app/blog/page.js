import React from "react";
import CardBlogs from "./cardBlogs";
export const metadata = {
  title: "Blogs | Tednih.",
};

const Blog = () => {
  return (
    <div className="bg bg-zinc-100 dark:bg-zinc-900 py-10 ">
      <CardBlogs />
    </div>
  );
};

export default Blog;
