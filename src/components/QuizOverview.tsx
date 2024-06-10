import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

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
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof Quiz | null;
    direction: "ascending" | "descending" | null;
  }>({ key: null, direction: null });

  const router = useRouter();

  const fetchQuizzes = async (): Promise<Quiz[]> => {
    const userId = localStorage.getItem("userUuid");
    console.log("Retrieved User ID:", userId); // Debugging log

    if (!userId) {
      console.error("User ID not found in localStorage");
      throw new Error("User ID not found");
    }

    const response = await fetch(`/api/getQuizOverview?userId=${userId}`);
    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched quizzes data:", data); // Debugging log
    return data.quizzes; // Ensure this line correctly extracts the quizzes array
  };

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
  } = useQuery<Quiz[], Error>({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  }) as {
    data: Quiz[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  };

  useEffect(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      setSortConfig({ key: "quiz_name", direction: "ascending" });
    }
  }, []);

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

  const sortedQuizzes = React.useMemo(() => {
    if (!Array.isArray(quizzes)) return [];

    let sortableItems = [...quizzes];
    if (sortConfig.key && sortConfig.direction) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === null) return 0;
        const valueA = String(a[sortConfig.key] ?? "");
        const valueB = String(b[sortConfig.key] ?? "");
        return sortConfig.direction === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      });
    }
    return sortableItems;
  }, [quizzes, sortConfig]);

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  if (!quizzes || quizzes.length === 0) {
    return <div>No quizzes to display</div>;
  }

  return (
    <div>
      {quizzes && quizzes.length > 0 ? (
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("quiz_name")}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("num_questions")}
              >
                Questions
              </th>
              <th
                className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("attempts_taken")}
              >
                Attempts
              </th>
              <th
                className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("last_attempt_time")}
              >
                Last Attempt
              </th>
              <th
                className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                className="tracking-wider cursor-pointer"
                onClick={() =>
                  router.push(
                    `/take-quiz?quizId=${quiz.quiz_id}&quizName=${encodeURIComponent(quiz.quiz_name)}`,
                  )
                }
              >
                <td className="px-6 py-4 text-center text-lg whitespace-nowrap">
                  {quiz.quiz_name}
                </td>
                <td className="px-6 py-4 text-center text-lg whitespace-nowrap">
                  {quiz.num_questions}
                </td>
                <td className="px-6 py-4 text-center text-lg whitespace-nowrap">
                  {quiz.attempts_taken}
                </td>
                <td className="px-6 py-4 text-center text-lg whitespace-nowrap">
                  {quiz.last_attempt_time
                    ? new Date(quiz.last_attempt_time).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )
                    : "N/A"}
                </td>
                <td className="px-6 py-4 text-center text-lg whitespace-nowrap">
                  {quiz.last_score !== null ? quiz.last_score : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg">No quizzes available.</p>
      )}
    </div>
  );
};

export default QuizOverview;
