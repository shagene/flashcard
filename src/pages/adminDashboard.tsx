// pages/adminDashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/LayoutAuth";

const AdminDashboard = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      router.push("/auth");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("userUuid");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated");
    router.push("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-xl mb-4">Welcome, {userEmail}!</p>
        <p className="text-lg mb-8">You are logged in as an admin.</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
