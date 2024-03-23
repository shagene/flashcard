// // src/pages/take-quiz.tsx

import Layout from "../components/LayoutAuth";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
const TakeQuizPage = () => {
  useAuth(); // Protect the page
  return <div>Take Quiz</div>;
};

export default TakeQuizPage;
