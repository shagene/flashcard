import React, { useState } from "react";
import Layout from "../components/Layout";

const questions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["A) Earth", "B) Jupiter", "C) Mars", "D) Saturn"],
    answer: "B) Jupiter",
  },
  {
    question: "What is the smallest planet in our solar system?",
    options: ["A) Earth", "B) Mercury", "C) Mars", "D) Saturn"],
    answer: "B) Mercury",
  },
  {
    question: "How many moons does Earth have?",
    options: ["A) 1", "B) 2", "C) 3", "D) 4"],
    answer: "A) 1",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["A) Earth", "B) Mars", "C) Venus", "D) Jupiter"],
    answer: "B) Mars",
  },
  {
    question: "Which planet is known as the 'Gas Giant'?",
    options: ["A) Earth", "B) Jupiter", "C) Mars", "D) Saturn"],
    answer: "B) Jupiter",
  },
];

const HomePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestionIndex].answer) {
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(null);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }, 2000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, 2000);
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-red-500 via-white to-purple-500 w-full py-20 shadow-md">
        {" "}
        <h1 className="text-center text-gray-700 text-6xl font-bold">
          Flash Card App
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {currentQuestionIndex < questions.length ? (
          <div className="bg-white w-3/4 p-8 m-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Question: {questions[currentQuestionIndex].question}
            </h2>
            <div className=" grid grid-cols-2 gap-4 md:grid-cols-4">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full h-12 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded ${isCorrect === true && option === questions[currentQuestionIndex].answer ? "bg-green-500 animate-pulse" : isCorrect === false && option === questions[currentQuestionIndex].options.find((o) => o !== questions[currentQuestionIndex].answer) ? "bg-red-500 animate-pulse" : "hover:bg-gray-300"}`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white w-3/4 p-8 m-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Congratulations! You've completed all questions.
            </h2>
          </div>
        )}
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
            Sign In
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2">
            Sign Up
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
