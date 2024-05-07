// src/components/SigninForm.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

interface SigninFormProps {
  setShowSignup: (show: boolean) => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ setShowSignup }) => {
  const [uuid, setUuid] = useState("");
  const { loading, error, handleSignin } = useAuth();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUuid(storedUserId);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignin(uuid);
    localStorage.setItem("userId", uuid);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {error && <p className="text-lg text-red-500">{error}</p>}
      <p className="text-lg text-center">
        Don't have an ID?{" "}
        <button
          onClick={() => setShowSignup(true)}
          className="text-lg text-indigo-600 hover:text-indigo-800"
        >
          Click here to sign up
        </button>
      </p>
    </>
  );
};

export default SigninForm;
