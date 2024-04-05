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
        className="px-4 py-2 bg-blue-500 text-lg text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={onStartQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
