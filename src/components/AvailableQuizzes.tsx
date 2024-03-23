// src/components/AvailableQuizzes.tsx
import React, { useEffect, useState } from "react";

interface Quiz {
  id: string;
  title: string;
  questions?: any[]; // Adjust according to your data structure
}

export interface AvailableQuizzesProps {
  quizzes: Quiz[];
}

const AvailableQuizzes: React.FC<AvailableQuizzesProps> = ({ quizzes }) => {
  const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>([]);
  const [quizId, setQuizId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const userId = localStorage.getItem("userUuid");
      if (!userId) return;

      try {
        const response = await fetch("/api/getQuizzes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userid: userId,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch quizzes, status: ${response.status}`,
          );
        }

        const quizzesData = await response.json();
        setFetchedQuizzes(quizzesData);
        // Assuming the first quiz is selected by default
        if (quizzesData.length > 0) {
          setQuizId(quizzesData[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const getTotalQuestionsFromQuiz = async () => {
      if (!quizId) return;
      try {
        const response = await fetch(
          `/api/getTotalQuestionsFromQuiz?quizId=${quizId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch quiz info, status: ${response.status}`,
          );
        }

        const data = await response.json();
        const updatedQuizzes = fetchedQuizzes.map((quiz) =>
          quiz.id === quizId
            ? { ...quiz, questions: Array(data.totalQuestions).fill({}) }
            : quiz,
        );
        setFetchedQuizzes(updatedQuizzes);
      } catch (error) {
        console.error("Failed to fetch quiz info:", error);
      }
    };

    getTotalQuestionsFromQuiz();
  }, [quizId, fetchedQuizzes]);

  return (
    <div>
      <h3 className="text-lg font-semibold">Available Quizzes</h3>
      {fetchedQuizzes.length > 0 ? (
        <ul>
          {fetchedQuizzes.map((quiz) => (
            <li key={quiz.id} className="mt-2">
              <h4 className="text-md font-medium">{quiz.title}</h4>
              <p>{quiz.questions?.length || 0} questions for the quiz</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes available. Create one!</p>
      )}
    </div>
  );
};

export default AvailableQuizzes;
