// src/components/LayoutAuth.tsx
import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const router = useRouter(); // Use the useRouter hook
  const isDashboard = router.pathname === "/dashboard";

  useEffect(() => {
    const updateUserEmail = () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        setUserEmail(email);
      }
    };

    updateUserEmail(); // Call the function initially

    const handleRouteChange = () => {
      updateUserEmail();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Add event listener for tab or browser close
    window.addEventListener("beforeunload", handleLogout);

    // Cleanup function to remove event listeners
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("beforeunload", handleLogout);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated"); // Make sure to remove the isAuthenticated flag

    // Redirect to the home page or sign-in page
    router.push("/"); // Adjust the path as needed

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Flash Card App</title>
        <meta name="description" content="To help with test prep." />
        <meta name="keywords" content="questions, quizzes, study" />
        <meta name="author" content="Steven Hagene" />
      </Head>
      <div className={inter.className}>
        <div className="appbar">
          <div className="title">Flash Card App</div>

          <div className="user-info">
            {userEmail ? <span>{userEmail}</span> : <span>No email found</span>}
            <button
              onClick={handleLogout}
              className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 logout-button"
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="link-wrapper">
          {!isDashboard && (
            <Link href="/dashboard">
              <span className="dashboard-link">
                <RiArrowGoBackFill /> Back to Dashboard
              </span>
            </Link>
          )}
        </div>

        {children}
      </div>
      <style jsx>{`
        .appbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem; /* 1rem remains the same */
          background-color: #333;
          color: #fff;
        }
        .user-info span {
          margin-right: 1rem; /* 1rem remains the same */
        }
        .logout-button {
          background-color: #0070f3;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem; /* Adjusted to rem */
          cursor: pointer;
          border-radius: 0.3125rem; /* 5px converted to rem */
          transition:
            background-color 0.3s,
            color 0.3s;
        }
        .logout-button:hover {
          background-color: #0056b3;
          color: #e0e0e0;
        }
        .link-wrapper {
          margin-top: 1rem;
          margin-left: 1rem;
        }
        .dashboard-link {
          color: #0070f3;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem; /* 8px converted to rem */
          font-size: 1rem; /* Adjusted to rem for consistency */
        }
        .dashboard-link:hover {
          text-decoration: underline;
          color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default LayoutAuth;
