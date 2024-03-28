import Link from "next/link";
import React, { useEffect, useState } from "react";

// Defines the structure of the Quiz object
interface Quiz {
  user_id: string;
  quiz_id: string;
  quiz_name: string;
  attempts_taken: number;
  last_attempt_time: string | null;
  last_score: string | null;
  num_questions: number;
}

const QuizOverview: React.FC = () => {
  // State variables to store fetched quizzes, sort configuration, and loading state
  const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Quiz | null;
    direction: "ascending" | "descending" | null;
  }>({ key: null, direction: null });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetches quiz overview data from the API when the component mounts
    const fetchQuizOverview = async () => {
      const userId = localStorage.getItem("userUuid");
      if (!userId) return;

      try {
        const response = await fetch(`/api/getQuizOverview?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch quiz overview, status: ${response.status}`,
          );
        }

        const data = await response.json();
        setFetchedQuizzes(data.quizzes);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch quiz overview:", error);
        setIsLoading(false);
      }
    };

    fetchQuizOverview();
  }, []);

  // Function to handle sorting request based on the clicked column
  const requestSort = (key: keyof Quiz) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Memoized value to store sorted quizzes based on the current sort configuration
  const sortedQuizzes = React.useMemo(() => {
    let sortableItems = [...fetchedQuizzes];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key!]! > b[sortConfig.key!]!) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key!]! < b[sortConfig.key!]!) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [fetchedQuizzes, sortConfig]);

  // Renders a loading message while the data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Renders the quiz overview table with sortable columns and quiz data
  return (
    <div>
      <h3 className="text-lg font-semibold">Available Quizzes</h3>
      {fetchedQuizzes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("quiz_name")}
                >
                  Quiz Name
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("num_questions")}
                >
                  Questions
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("attempts_taken")}
                >
                  Attempts Taken
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("last_attempt_time")}
                >
                  Last Attempt Time
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort("last_score")}
                >
                  Last Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedQuizzes.map((quiz) => (
                <tr
                  key={quiz.quiz_id}
                  onClick={() =>
                    (window.location.href = `/take-quiz?quizId=${quiz.quiz_id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.quiz_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.num_questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.attempts_taken}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.last_attempt_time || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz.last_score || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
};

export default QuizOverview;
