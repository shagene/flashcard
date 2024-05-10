import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LayoutAuth from "../components/LayoutAuth";
import { useAuth } from "@/hooks/useAuth";
import { fetchQuizDetails } from "./api/takeQuiz";
import useTimer from "@/hooks/useTimer";
import QuizStart from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import QuizFinish from "@/components/QuizFinish";

const TakeQuizPage = () => {
  useAuth();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userUuid"));
  }, []);
  const { quizId, quizName } = router.query;
  const [quiz, setQuiz] = useState<{ questions: any[] } | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const timeElapsed = useTimer(startTime, stopTime);
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
        const questions = quizData
          .map((q) => ({
            ...q,
            answers: [
              { text: q.correct_answer, isCorrect: true },
              { text: q.incorrect_answer1, isCorrect: false },
              { text: q.incorrect_answer2, isCorrect: false },
              { text: q.incorrect_answer3, isCorrect: false },
            ].sort(() => Math.random() - 0.5),
          }))
          .sort(() => Math.random() - 0.5);
        setQuiz({ questions });
      });
    }
  }, [quizId]);

  const startQuiz = () => {
    setStartTime(new Date());
  };

  const submitAnswer = async (answer: any): Promise<void> => {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      const isCorrect = answer.isCorrect;
      const updatedAnswers = [
        ...submittedAnswers,
        {
          questionId: quiz.questions[currentQuestionIndex].id,
          isCorrect,
          selectedAnswer: answer.text,
        },
      ];

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setSubmittedAnswers(updatedAnswers);

      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < quiz.questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setQuizFinished(true);
        setStopTime(new Date());
        const quizId = router.query.quizId;
        const timeTaken = timeElapsed; // Make sure timeElapsed is correctly updated before this line
        console.log("Time taken: ", timeTaken);

        const [minutes, seconds] = timeTaken.split(":").map(Number);
        const timeTakenInterval = `${minutes} minutes ${seconds} seconds`;

        console.log("Formatted Interval:", timeTakenInterval);
        fetch("/api/takeQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizId,
            answers: updatedAnswers,
            timeTaken: timeTakenInterval,
            userId: userId,
          }),
        })
          .then((response) => response.json())
          .catch((error) =>
            console.error("Error submitting quiz answers:", error),
          );
      }
    }
  };

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
    const missedQuestions = submittedAnswers
      .filter((answer) => !answer.isCorrect)
      .map((answer) => {
        const question = quiz.questions.find((q) => q.id === answer.questionId);
        const userAnswer = question.answers.find(
          (a: { isCorrect: boolean; text: string }) =>
            a.isCorrect === answer.isCorrect,
        ).text;
        const correctAnswer = question.answers.find(
          (a: { isCorrect: boolean; text: string }) => a.isCorrect,
        ).text;
        return {
          question: question.question,
          userAnswer,
          correctAnswer,
        };
      });

    return (
      <LayoutAuth>
        <QuizFinish
          scorePercentage={scorePercentage}
          score={score}
          totalQuestions={quiz.questions.length}
          timeElapsed={timeElapsed}
          onGoToDashboard={goToDashboard}
          missedQuestions={missedQuestions}
        />
      </LayoutAuth>
    );
  }

  return (
    <LayoutAuth>
      {!startTime ? (
        <QuizStart
          quizName={quizName}
          totalQuestions={quiz.questions.length}
          onStartQuiz={startQuiz}
        />
      ) : (
        <QuizQuestion
          question={quiz.questions[currentQuestionIndex].question}
          answers={quiz.questions[currentQuestionIndex].answers}
          onAnswerSubmit={submitAnswer}
          timeElapsed={timeElapsed}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quiz.questions.length}
        />
      )}
    </LayoutAuth>
  );
};

export default TakeQuizPage;
