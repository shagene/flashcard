// src/hooks/useAuth.ts
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

interface UseAuthReturn {
  loading: boolean;
  error: string;
  handleSignup: (email: string) => Promise<string | null>;
  handleSignin: (uuid: string) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = useCallback(
    async (email: string): Promise<string | null> => {
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
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userUuid", data.uuid); // Ensure userUuid is set
          console.log("User ID set in localStorage:", data.uuid); // Debugging log
          setLoading(false);
          return data.uuid; // Return the UUID
        } else {
          setError("Signup failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
      return null;
    },
    [],
  );

  const handleSignin = useCallback(
    async (uuid: string) => {
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
        console.log(data);
        if (data.email) {
          localStorage.setItem("userUuid", uuid);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("isAuthenticated", "true");
          console.log("User ID set in localStorage:", uuid); // Debugging log

          // Check the user's role and redirect accordingly
          if (data.role === "admin") {
            router.push("/adminDashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          setError("Signin failed. Please try again.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
      setLoading(false);
    },
    [router],
  );

  return { loading, error, handleSignup, handleSignin };
};