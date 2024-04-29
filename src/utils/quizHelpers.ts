// File: src/utils/quizHelpers.ts
export const initialQuestion = {
  question: "",
  correct_answer: "",
  incorrect_answers: ["", "", ""],
};

export const fetchQuizResults = async () => {
  const response = await fetch("/api/quiz-results");
  if (!response.ok) {
    throw new Error("Failed to fetch quiz results");
  }
  const results = await response.json();
  return results.map((result: any) => ({
    id: result.attempt_id,
    quizId: result.quiz_id,
    quizName: result.quiz_title,
    question: result.question,
    correctAnswer: result.correct_answer,
    incorrectAnswer1: result.incorrect_answer1,
    incorrectAnswer2: result.incorrect_answer2,
    incorrectAnswer3: result.incorrect_answer3,
    date: new Date(result.attempt_timestamp).toLocaleDateString(),
    isCorrect: result.is_correct,
    score: result.score,
    timeTaken: result.time_taken,
  }));
};
