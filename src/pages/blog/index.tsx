import Link from "next/link";
import Layout from "../../components/LayoutNonAuth";

const BlogPage = () => {
  const blogPosts = [
    { slug: "blog-post-1", title: "Getting Started", date: "2024-05-06" },
    { slug: "blog-post-2", title: "Creating Quizzes", date: "2024-05-07" },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Blog</h1>
        <ul className="space-y-2">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:underline"
              >
                {post.title}
              </Link>
              <span className="text-gray-500 ml-2">{post.date}</span>
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
