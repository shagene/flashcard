// src/pages/dashboard.tsx
import React from "react";
import Layout from "../components/LayoutAuth";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import QuizOverview from "@/components/QuizOverview";

interface Quiz {
  id: string;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  useAuth(); // Protect the page

  const router = useRouter();

  const quizzes: Quiz[] = []; // Define quizzes with the correct type
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
              className="mt-2 px-4 py-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleCreateQuiz}
            >
              Create
            </button>
          </div>
          <div className="border p-4 rounded-lg shadow">
            <QuizOverview />
          </div>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">View Quiz Results</h2>
            {results.length > 0 ? (
              <p>Check out your quiz results.</p>
            ) : (
              <p>No results yet. Take a quiz!</p>
            )}
            <button
              className="mt-2 px-4 py-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
