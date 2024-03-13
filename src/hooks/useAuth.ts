// hooks/useAuth.ts
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // If not authenticated, redirect to the home page
    if (isAuthenticated !== "true") {
      router.push("/");
    }
  }, [router]);
};

export default useAuth;
