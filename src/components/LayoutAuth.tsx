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
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter(); // Use the useRouter hook
  const isDashboard = router.pathname === "/dashboard";

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }

    // Set a timeout for auto logout after 2 minutes
    // const timeout = setTimeout(() => {
    //   handleLogout();
    // }, 120000); // 120000 milliseconds = 2 minutes

    // Add event listener for tab or browser close
    window.addEventListener("beforeunload", handleLogout);

    // Cleanup function to clear the timeout and remove event listener
    return () => {
      // clearTimeout(timeout);
      window.removeEventListener("beforeunload", handleLogout);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAuthenticated"); // Make sure to remove the isAuthenticated flag

    // Redirect to the home page or sign-in page
    router.push("/"); // Adjust the path as needed
  };

  return (
    <>
      <Head>
        <title>Flash Card App</title>
        <meta name="description" content="To help with test prep." />
        <meta name="keywords" content="flashcards, quizzes, study" />
        <meta name="author" content="Steven Hagene" />
      </Head>
      <div className={inter.className}>
        <div className="appbar">
          <div className="title">Flash Card App</div>

          <div className="user-info">
            {userEmail ? <span>{userEmail}</span> : <span>No email found</span>}
            <button onClick={handleLogout} className="logout-button">
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
