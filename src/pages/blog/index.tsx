// src/pages/blog/index.tsx
import React from "react";
import Layout from "../../components/LayoutNonAuth";

const BlogPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Blog / Change Log</h1>
        {/* Add your blog posts or change log entries here */}
      </div>
    </Layout>
  );
};

export default BlogPage;
