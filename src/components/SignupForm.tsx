// src/components/SignupForm.tsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

interface SignupFormProps {
  setShowSignup: (show: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ setShowSignup }) => {
  const [email, setEmail] = useState("");
  const { loading, error, handleSignup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uuid = await handleSignup(email);
    if (uuid) {
      alert(`Your UUID is: ${uuid}. You will be redirected to the dashboard.`);
      // Optionally store the UUID in localStorage or context for later use
      localStorage.setItem("userUuid", uuid);
      router.push("/dashboard");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          className="text-lg w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-lg text-center">
        Already have an ID?{" "}
        <button
          onClick={() => setShowSignup(false)}
          className="text-lg text-indigo-600 hover:text-indigo-800"
        >
          Click here to sign in
        </button>
      </p>
    </>
  );
};

export default SignupForm;
