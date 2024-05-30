import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTimes, FaArrowRight } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SigninFormProps {
  setShowSignup: (show: boolean) => void;
}

interface User {
  uuid: string;
  email: string;
}

const SigninForm: React.FC<SigninFormProps> = ({ setShowSignup }) => {
  const [uuid, setUuid] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const signInMutation = useMutation({
    mutationFn: async (uuid: string) => {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      return response.json();
    },
    onSuccess: (data) => {
      const { uuid, email } = data;

      // Save the last signed-in user
      localStorage.setItem("lastSignedInUser", uuid);

      // Update the list of users
      const updatedUsers = [
        { uuid, email },
        ...users.filter((user) => user.uuid !== uuid),
      ];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      router.push("/dashboard");
    },
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    signInMutation.mutate(uuid);
  };

  const handleRemoveUser = (id: string) => {
    if (id === uuid) {
      setError("Cannot remove the currently selected UUID.");
      return;
    }
    const updatedUsers = users.filter((user) => user.uuid !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
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
          disabled={signInMutation.status === "pending"}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {signInMutation.status === "pending" ? "Signing In..." : "Sign In"}
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
      <div>
        <h3 className="text-lg font-medium text-gray-700">
          Previously used IDs:
        </h3>
        <div className="mt-4 space-y-4">
          {users.map((user) => (
            <div
              key={user.uuid}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">{user.uuid}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setUuid(user.uuid)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <FaArrowRight />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveUser(user.uuid);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SigninForm;
