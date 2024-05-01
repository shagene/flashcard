// src/pages/landing.tsx
import React from "react";
import Layout from "../components/LayoutNonAuth";
import Link from "next/link";

const LandingPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Quiz App</h1>
        <p className="text-xl text-gray-600 text-center m-4">
          Welcome to the Quiz App! Create, manage, and study with custom
          quizzes.
        </p>
        <div className="space-x-4">
          <Link href="/auth">
            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
              Get Started
            </button>
          </Link>
          <Link href="/blog">
            <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">
              Blog / Change Log
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
