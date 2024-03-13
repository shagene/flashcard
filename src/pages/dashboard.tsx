// src/pages/dashboard.tsx

import React from "react";
import Layout from "../components/LayoutAuth";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  useAuth(); // Protect the page
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
