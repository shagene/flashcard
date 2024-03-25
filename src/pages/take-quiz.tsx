// src/pages/take-quiz.tsx

import Layout from "../components/LayoutAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import LayoutAuth from "../components/LayoutAuth";

const TakeQuizPage = () => {
  useAuth(); // Protect the page
  const router = useRouter();
  const { quizId } = router.query; // Accessing the quizId parameter from the URL

  useEffect(() => {
    if (quizId) {
      console.log(`Quiz ID: ${quizId}`);
      // You can fetch quiz details using quizId here
    }
  }, [quizId]);

  return (
    <LayoutAuth>
      <div>Take Quiz ID: {quizId}</div>
    </LayoutAuth>
  );
};

export default TakeQuizPage;
