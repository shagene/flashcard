// src/components/QuizStart.tsx
import React from "react";

interface QuizStartProps {
  quizName: string | string[] | undefined;
  totalQuestions: number;
  onStartQuiz: () => void;
}

const QuizStart: React.FC<QuizStartProps> = ({
  quizName,
  totalQuestions,
  onStartQuiz,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-5xl font-bold">
        {decodeURIComponent(quizName as string)}
      </h1>
      <div>Total Questions: {totalQuestions}</div>
      <button
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
