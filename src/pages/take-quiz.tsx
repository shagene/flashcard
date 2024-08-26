import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import LayoutAuth from "../components/LayoutAuth";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useTimer from "@/hooks/useTimer";
import QuizStart from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import QuizFinish from "@/components/QuizFinish";

const fetchQuizDetails = async (quizId: string) => {
  console.log("Fetching quiz details for quizId:", quizId);
  const response = await fetch(`/api/takeQuiz?quizId=${quizId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    ...data,
    questions: data.quizDetails,
  };
};

// Move formatAnswers outside the component
const formatAnswers = (question: any) => {
  if (!question) return [];
  return [
    { text: question.correct_answer, isCorrect: true },
    { text: question.incorrect_answer1, isCorrect: false },
    { text: question.incorrect_answer2, isCorrect: false },
    { text: question.incorrect_answer3, isCorrect: false },
  ].sort(() => 0.5 - Math.random());
};

const TakeQuizPage = () => {
  useAuth();
  const router = useRouter();
  const { quizId, quizName } = router.query;

  const [userId, setUserId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const timeElapsed = useTimer(startTime, stopTime);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Array<{ questionId: string; isCorrect: boolean; selectedAnswer: string }>
  >([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quizDetails", quizId],
    queryFn: () => fetchQuizDetails(quizId as string),
    enabled: !!quizId,
  });

  const formattedAnswers = useMemo(() => {
    if (quiz && quiz.questions && quiz.questions[currentQuestionIndex]) {
      return formatAnswers(quiz.questions[currentQuestionIndex]);
    }
    return [];
  }, [quiz, currentQuestionIndex]);

  useEffect(() => {
    setUserId(localStorage.getItem("userUuid"));
  }, []);

  useEffect(() => {
    console.log("quizId:", quizId);
    console.log("quiz:", quiz);
    console.log("isLoading:", isLoading);
    console.log("error:", error);
  }, [quizId, quiz, isLoading, error]);

  const startQuiz = () => {
    setStartTime(new Date());
  };

  const submitAnswer = async (answer: any): Promise<void> => {
    console.log("submitAnswer called with:", answer);
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
        const timeTaken = timeElapsed;
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

  if (isLoading) {
    return (
      <LayoutAuth>
        <div>Loading quiz...</div>
      </LayoutAuth>
    );
  }

  if (error) {
    return (
      <LayoutAuth>
        <div>Error loading quiz: {error.message}</div>
      </LayoutAuth>
    );
  }

  if (quizFinished) {
    const scorePercentage = (score / quiz.questions.length) * 100;
    const missedQuestions = submittedAnswers
      .filter((answer) => !answer.isCorrect)
      .map((answer) => {
        const question = quiz.questions.find(
          (q: { id: string }) => q.id === answer.questionId
        );
        return {
          question: question.question,
          userAnswer: answer.selectedAnswer,
          correctAnswer: question.correct_answer,
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

  console.log("Current quiz state:", quiz);
  console.log("Current question index:", currentQuestionIndex);
  console.log("Current question:", quiz?.questions?.[currentQuestionIndex]);

  return (
    <LayoutAuth>
      {quiz && quiz.questions ? (
        !startTime ? (
          <QuizStart
            quizName={quizName}
            totalQuestions={quiz.questions.length}
            onStartQuiz={startQuiz}
          />
        ) : (
          <QuizQuestion
            question={quiz.questions[currentQuestionIndex].question}
            answers={formattedAnswers}
            onAnswerSubmit={submitAnswer}
            timeElapsed={timeElapsed}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
          />
        )
      ) : (
        <div>Loading quiz details...</div>
      )}
    </LayoutAuth>
  );
};

export default TakeQuizPage;