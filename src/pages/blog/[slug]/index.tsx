import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../../components/LayoutNonAuth";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`/api/getBlogPostBySlug?slug=${slug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch blog post, status: ${response.status}`,
          );
        }

        const data = await response.json();
        setPost(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch blog post:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Blog post not found.</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">{post.title}</h1>
        <p className="text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="prose">
          <p>{post.content}</p>
        </div>
        <Link href="/blog">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Back to Blog
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default BlogPostPage;
