import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/LayoutNonAuth";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/getBlogPosts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch blog posts, status: ${response.status}`,
          );
        }

        const data = await response.json();
        setBlogPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Blog</h1>
        <ul className="space-y-2">
          {blogPosts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:underline"
              >
                {post.title}
              </Link>
              <span className="text-gray-500 ml-2">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
        <Link href="/">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Back to Home
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default BlogPage;
