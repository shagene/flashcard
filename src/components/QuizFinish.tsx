// src/components/QuizFinish.tsx
import React from "react";

interface QuizFinishProps {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
  timeElapsed: string;
  onGoToDashboard: () => void;
  missedQuestions: any[]; // Specify the correct type instead of any if possible
}

const QuizFinish: React.FC<QuizFinishProps> = ({
  scorePercentage,
  score,
  totalQuestions,
  timeElapsed,
  onGoToDashboard,
  missedQuestions,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-6xl font-bold text-indigo-600">Quiz Finished!</h1>
      <div className="text-lg">
        Your score:{" "}
        <span className="font-semibold">{scorePercentage.toFixed(2)}%</span> (
        {score} out of {totalQuestions})
      </div>
      <div className="text-lg">
        Time taken: <span className="font-semibold">{timeElapsed}</span>
      </div>
      <h2 className="text-4xl text-indigo-500">Missed Questions:</h2>
      {missedQuestions.length > 0 ? (
        <ul className="list-disc space-y-2 pl-5">
          {missedQuestions.map((item, index) => (
            <li key={index} className="text-lg">
              <p>
                <span className="font-semibold">Question:</span> {item.question}
              </p>
              <p>
                <span className="font-semibold">Your Answer:</span>{" "}
                {item.userAnswer}
              </p>
              <p>
                <span className="font-semibold">Correct Answer:</span>{" "}
                {item.correctAnswer}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No questions missed. Great job!</p>
      )}
      <button
        className="mt-6 px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={onGoToDashboard}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default QuizFinish;
