// src/pages/auth.tsx
import React, { useState } from "react";
import Link from "next/link";
import Layout from "../components/LayoutNonAuth";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-72 w-auto"
            src="/logo1.png"
            alt="Your Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {!showSignup ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {!showSignup ? (
              <SigninForm setShowSignup={setShowSignup} />
            ) : (
              <SignupForm setShowSignup={setShowSignup} />
            )}
            <div className="text-center">
              <Link
                href="/"
                className="text-lg text-indigo-600 hover:text-indigo-800"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
