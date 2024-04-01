// src/components/QuizFinish.tsx
import React from "react";

interface QuizFinishProps {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
  timeElapsed: string;
  onGoToDashboard: () => void;
}

const QuizFinish: React.FC<QuizFinishProps> = ({
  scorePercentage,
  score,
  totalQuestions,
  timeElapsed,
  onGoToDashboard,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Quiz Finished!</h1>
      <div>
        Your score: {scorePercentage.toFixed(2)}% ({score} out of{" "}
        {totalQuestions})
      </div>
      <div>Time taken: {timeElapsed}</div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={onGoToDashboard}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default QuizFinish;
