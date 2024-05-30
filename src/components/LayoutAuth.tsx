// src/components/LayoutAuth.tsx
import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const isDashboard = router.pathname === "/dashboard";

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetch("/api/user");
        if (response.ok) {
          const data = await response.json();
          setUserEmail(data.email);
        } else {
          setUserEmail("");
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
        setUserEmail("");
      }
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response.ok) {
        setUserEmail("");
        router.push("/");
      } else {
        console.error("Error logging out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="To help with test prep." />
        <meta name="keywords" content="questions, quizzes, study" />
        <meta name="author" content="Steven Hagene" />
      </Head>
      <div className={inter.className}>
        <div className="appbar">
          <div className="title text-lg">Quiz App</div>

          <div className="user-info text-lg">
            {userEmail ? (
              <>
                <span>{userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 logout-button"
                >
                  Log Out
                </button>
              </>
            ) : (
              <span>No user logged in</span>
            )}
          </div>
        </div>
        <div className="link-wrapper">
          {!isDashboard && (
            <Link href="/dashboard">
              <span className="dashboard-link text-lg">
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
