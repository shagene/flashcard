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
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="absolute top-20 right-0 p-4">Time: {timeElapsed}</div>
      <div>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      <div>{question}</div>
      {answers.map((answer, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-200 text-lg text-black rounded hover:bg-gray-300 transition duration-300"
          onClick={() => onAnswerSubmit(answer)}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
};

export default QuizQuestion;
