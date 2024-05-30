// src/components/SignupForm.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SignupFormProps {
  setShowSignup: (show: boolean) => void;
}

interface User {
  uuid: string;
  email: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ setShowSignup }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const signupMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { uuid, email } = data;

      // Save the last signed-up user
      localStorage.setItem("lastSignedInUser", uuid);

      // Update the list of users
      const updatedUsers = [
        { uuid, email },
        ...users.filter((user) => user.uuid !== uuid),
      ];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      // Alert the user with their UUID
      alert(`Your UUID is: ${uuid}`);

      router.push("/dashboard");
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    signupMutation.mutate(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
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
          disabled={signupMutation.status === "pending"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {signupMutation.status === "pending" ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-lg text-red-500">{error}</p>}
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
