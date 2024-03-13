// src/components/LayoutAuth.tsx
import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const LayoutAuth = ({ children }: Props) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    console.log("Retrieved email from localStorage:", email); // Debugging log
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
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
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        {children}
      </div>
      <style jsx>{`
        .appbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #333;
          color: #fff;
        }
        .user-info span {
          margin-right: 1rem;
        }
        button {
          background-color: #f00;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default LayoutAuth;
