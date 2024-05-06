import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

import Layout from "../components/LayoutAuth";
import { useAuth } from "@/hooks/useAuth";
import { fetchQuizResults } from "@/utils/quizHelpers";
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ViewResultsPage = () => {
  const router = useRouter();
  useAuth(); // Protect the page
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userUuid"));
  }, []);

  useEffect(() => {
    if (userId) {
      fetchQuizResults(userId)
        .then((results) => {
          setQuizResults(results);
        })
        .catch((error) => console.error("Error fetching quiz results:", error));
    }
  }, [userId]);

  const uniqueQuizzes = Array.from(
    new Set(quizResults.map((result) => result.quizName)),
  );

  const handleQuizSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuiz = event.target.value;
    setSelectedQuiz(selectedQuiz);
  };

  const handleAttemptClick = (result: any) => {
    router.push({
      pathname: `/quiz-detail/${result.id}`,
      query: { result: JSON.stringify(result) },
    });
  };

  const filteredResults = selectedQuiz
    ? quizResults.filter((result) => result.quizName === selectedQuiz)
    : [];

  const formatTimeTaken = (timeTaken: string) => {
    const [hours, minutes, seconds] = timeTaken.split(":").map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const formattedMinutes = Math.floor(totalSeconds / 60);
    const formattedSeconds = totalSeconds % 60;
    return `${formattedMinutes} minute(s) ${formattedSeconds} second(s)`;
  };

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold">Results</h1>
        <div className="mt-8">
          <label htmlFor="quiz-select" className="mr-2">
            Select Quiz:
          </label>
          <select
            id="quiz-select"
            value={selectedQuiz || ""}
            onChange={handleQuizSelect}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All Quizzes</option>
            {uniqueQuizzes.map((quiz) => (
              <option key={quiz} value={quiz}>
                {quiz}
              </option>
            ))}
          </select>
        </div>
        {uniqueQuizzes.length === 0 ? (
          <div className="mt-8">
            <p>There is currently no available quiz data.</p>
            <p>Please take a quiz to view results.</p>
          </div>
        ) : (
          selectedQuiz && (
            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">
                {selectedQuiz} Results
              </h2>
              <ul>
                {Array.from(
                  new Set(filteredResults.map((result) => result.id)),
                ).map((uniqueId) => {
                  const result = filteredResults.find((r) => r.id === uniqueId);
                  return (
                    <li
                      key={uniqueId}
                      className="border border-gray-300 rounded p-4 mb-4 cursor-pointer"
                      onClick={() => handleAttemptClick(result)}
                    >
                      <p>Attempt ID: {uniqueId}</p>
                      <p>Date: {result?.date}</p>
                      <p>Score: {result?.score}</p>
                      <p>
                        Time Taken: {formatTimeTaken(result?.timeTaken || "")}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default ViewResultsPage;
