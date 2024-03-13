import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/LayoutNonAuth";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [uuid, setUuid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false); // New state to toggle between forms
  const router = useRouter();

  const handleSignup = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.email) {
        localStorage.setItem("userEmail", data.email);
        router.push("/dashboard");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleSignin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid }),
      });
      const data = await response.json();
      if (data.email) {
        localStorage.setItem("userEmail", data.email);
        router.push("/dashboard");
      } else {
        setError("Signin failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
        <h1 className="text-4xl font-bold text-gray-700">Flash Card App</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="w-full max-w-md">
          {!showSignup ? (
            <>
              <form onSubmit={handleSignin} className="mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="uuid"
                    className="block text-sm font-medium text-gray-700"
                  >
                    UUID
                  </label>
                  <input
                    type="text"
                    id="uuid"
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    placeholder="Enter your UUID"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <p className="text-center">
                Don't have an ID?{" "}
                <button
                  onClick={() => setShowSignup(true)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Click here to sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
              <p className="text-center">
                Already have an ID?{" "}
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Click here to sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
