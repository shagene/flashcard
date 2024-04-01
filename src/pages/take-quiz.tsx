import { useState, useEffect } from "react";
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
        setStopTime(new Date());
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
        <QuizFinish
          scorePercentage={scorePercentage}
          score={score}
          totalQuestions={quiz.questions.length}
          timeElapsed={timeElapsed}
          onGoToDashboard={goToDashboard}
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
