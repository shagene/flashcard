// src/hooks/useAuthRedirect.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      router.push("/dashboard");
    }
  }, [router]);
};

export default useAuthRedirect;
