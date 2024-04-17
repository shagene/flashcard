// src/components/QuizQuestion.tsx
import React from "react";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionProps {
  question: string;
  answers: Answer[];
  onAnswerSubmit: (answer: Answer) => void;
  timeElapsed: string;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  answers,
  onAnswerSubmit,
  timeElapsed,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl mx-auto p-8">
      <div className="absolute top-20 right-0 p-4 text-2xl font-semibold">
        Time: {timeElapsed}
      </div>
      <div className="text-2xl font-semibold">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <div className="text-3xl font-bold my-6">{question}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {answers.map((answer, index) => (
          <button
            key={index}
            className="px-8 py-4 bg-gray-200 border border-transparent rounded-md shadow-sm text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-gray-300 transition duration-300 w-full"
            onClick={() => onAnswerSubmit(answer)}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
