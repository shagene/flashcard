import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../../components/LayoutNonAuth";

interface BlogPostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    date: string;
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">{post.title}</h1>
        <p className="text-gray-500">{post.date}</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of blog post slugs from your data source
  const posts = [
    { slug: "blog-post-1" },
    { slug: "blog-post-2" },
    { slug: "blog-post-3" },
  ];

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  // Fetch the blog post data based on the slug
  const post = {
    slug: params?.slug as string,
    title: `Blog Post ${params?.slug}`,
    content: `This is the content of blog post ${params?.slug}.`,
    date: "2023-06-01",
  };

  return {
    props: {
      post,
    },
  };
};

export default BlogPost;
