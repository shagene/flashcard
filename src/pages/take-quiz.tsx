import LayoutAuth from "../components/LayoutAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { fetchQuizDetails } from "./api/takeQuiz";

const TakeQuizPage = () => {
  useAuth(); // Protect the page
  const router = useRouter();
  const { quizId } = router.query;
  const [quiz, setQuiz] = useState<any>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (quizId) {
      fetchQuizDetails(quizId).then((quiz) => {
        setQuiz(quiz);
      });
    }
  }, [quizId]);

  const startQuiz = () => {
    setStartTime(new Date());
  };

  if (!quiz || !quiz.questions) {
    return (
      <LayoutAuth>
        <div>Loading quiz...</div>
      </LayoutAuth>
    );
  }

  function submitAnswer(answer: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <LayoutAuth>
      {!startTime ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Quiz: {quiz.title}</h1>
          <p>{quiz.description}</p>
          <div>Total Questions: {quiz.questions.length}</div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={startQuiz}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
          <div>{quiz.questions[currentQuestionIndex].questionText}</div>
          {quiz.questions[currentQuestionIndex].answers.map(
            (answer: any, index: number) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition duration-300"
                onClick={() => submitAnswer(answer)}
              >
                {answer.text}
              </button>
            ),
          )}
        </div>
      )}
    </LayoutAuth>
  );
};

export default TakeQuizPage;
