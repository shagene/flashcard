// src/pages/auth.tsx
import React, { useState } from "react";
import Layout from "../components/LayoutNonAuth";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-5xl font-bold text-gray-700">Authentication</h1>
        <div className="w-full max-w-md">
          {!showSignup ? (
            <SigninForm setShowSignup={setShowSignup} />
          ) : (
            <SignupForm setShowSignup={setShowSignup} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
