import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LayoutAuth from "../components/LayoutAuth";
import { useAuth } from "@/hooks/useAuth";
import { fetchQuizDetails } from "./api/takeQuiz";

const TakeQuizPage = () => {
  useAuth(); // Protect the page
  const router = useRouter();
  const { quizId, quizName } = router.query;
  const [quiz, setQuiz] = useState<{ questions: any[] } | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Array<{ questionId: any; isCorrect: boolean }>
  >([]);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (quizId) {
      fetchQuizDetails(quizId).then((quizData) => {
        if (!quizData) return;
        const questions = quizData.map((q) => ({
          ...q,
          answers: [
            { text: q.correct_answer, isCorrect: true },
            { text: q.incorrect_answer1, isCorrect: false },
            { text: q.incorrect_answer2, isCorrect: false },
            { text: q.incorrect_answer3, isCorrect: false },
          ].sort(() => Math.random() - 0.5), // Shuffle answers
        }));
        setQuiz({ questions });
      });
    }
  }, [quizId]);

  const startQuiz = () => {
    setStartTime(new Date());
  };

  function submitAnswer(answer: any): void {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      const isCorrect = answer.isCorrect;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setSubmittedAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionId: quiz.questions[currentQuestionIndex].id, isCorrect },
      ]);

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quiz.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setQuizFinished(true);
      }
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  if (!quiz || quiz.questions.length === 0) {
    return (
      <LayoutAuth>
        <div>Loading quiz...</div>
      </LayoutAuth>
    );
  }

  if (quizFinished) {
    const scorePercentage = (score / quiz.questions.length) * 100;
    return (
      <LayoutAuth>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Quiz Finished!</h1>
          <div>
            Your score: {scorePercentage.toFixed(2)}% ({score} out of{" "}
            {quiz.questions.length})
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            onClick={goToDashboard}
          >
            Go to Dashboard
          </button>
        </div>
      </LayoutAuth>
    );
  }

  return (
    <LayoutAuth>
      {!startTime ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">
            {decodeURIComponent(quizName as string)}
          </h1>
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
          <div>{quiz.questions[currentQuestionIndex].question}</div>
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
