// src/pages/dashboard.tsx

import React from "react";
import Layout from "../components/LayoutAuth";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

const Dashboard = () => {
  useAuth(); // Protect the page

  const router = useRouter();

  const quizzes = [];
  const results = [];

  const handleCreateQuiz = () => {
    router.push("/create-quiz");
  };

  const handleViewResults = () => {
    router.push("/view-results");
  };

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">Create Quiz</h2>
            <p>Create your own quizzes.</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleCreateQuiz}
            >
              Create
            </button>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">Take Quiz</h2>
            {quizzes.length > 0 ? (
              <p>Start taking quizzes.</p>
            ) : (
              <p>No quizzes available. Create one!</p>
            )}
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Take
            </button>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">View Quiz Results</h2>
            {results.length > 0 ? (
              <p>Check out your quiz results.</p>
            ) : (
              <p>No results yet. Take a quiz!</p>
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleViewResults}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
