// Updated dashboard.tsx to include QuizOverview inside DashboardCard
import React from "react";
import Layout from "../components/LayoutAuth";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import DashboardCard from "@/components/DashboardCard";
import QuizOverview from "@/components/QuizOverview";

const Dashboard: React.FC = () => {
  useAuth();
  const router = useRouter();

  const handleCreateQuiz = () => {
    router.push("/create-quiz");
  };

  const handleViewResults = () => {
    router.push("/view-results");
  };

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-indigo-600 my-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <DashboardCard
            title="Create Quiz"
            description="Create your own quizzes."
            buttonText="Create"
            onButtonClick={handleCreateQuiz}
          />
          <DashboardCard title="Quiz Overview">
            <QuizOverview />
          </DashboardCard>
          <DashboardCard
            title="View Quiz Results"
            description="Check out your quiz results."
            buttonText="View"
            onButtonClick={handleViewResults}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
