// src/pages/dashboard.tsx

import React from "react";
import Layout from "../components/LayoutAuth";

const Dashboard = () => {
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
