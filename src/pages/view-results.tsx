import React from "react";

import Layout from "../components/LayoutAuth";
import { useAuth } from "@/hooks/useAuth";

const ViewResultsPage = () => {
  useAuth(); // Protect the page

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Results</h1>
        <p className="text-lg">Welcome to your results page!</p>
      </div>
    </Layout>
  );
};

export default ViewResultsPage;
