import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { quizId } = req.query;
    if (!quizId) {
      return res.status(400).json({ error: "quizId is required" });
    }

    const quizDetails = await fetchQuizDetails(quizId);

    if (!quizDetails) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.status(200).json({ quizDetails });
  } else if (req.method === "POST") {
    const { quizId, answers } = req.body;
    if (!req.body.userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const result = await submitQuizAnswers(
      quizId,
      answers,
      req.body.timeTaken,
      req.body.userId,
    );
    res.status(200).json({ result });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const fetchQuizDetails = async (
  quizId: string | string[] | undefined,
) => {
  if (!quizId) return null;
  let { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", quizId);

  if (error) {
    return null;
  }

  return data;
};

export const submitQuizAnswers = async (
  quizId: string | string[] | undefined,
  answers:
    | Array<{ questionId: string; selectedAnswer: string; isCorrect: boolean }>
    | undefined,
  timeTaken: string,
  userId: string,
) => {
  let score = answers?.filter((answer) => answer.isCorrect).length ?? 0;

  const insertResponse = await supabase
    .from("user_quiz_attempts")
    .insert({
      user_id: userId,
      quiz_id: quizId,
      attempt_timestamp: new Date().toISOString(),
      score: score,
      time_taken: timeTaken,
    })
    .single();

  const { data: attemptData, error: attemptError } = insertResponse;

  if (attemptError) {
    return { error: attemptError.message };
  }

  if (!attemptData) {
    return { error: "Failed to retrieve attempt ID after insertion." };
  }

  const attemptId = (attemptData as any)?.id;
  if (!attemptId) {
    return { error: "Failed to retrieve attempt ID after insertion." };
  }

  for (const answer of answers ?? []) {
    const responsePayload = {
      attempt_id: attemptId,
      question_id: answer.questionId,
      selected_answer: answer.selectedAnswer,
      is_correct: answer.isCorrect,
      created_at: new Date().toISOString(),
    };

    const { error: responseError } = await supabase
      .from("user_quiz_responses")
      .insert([responsePayload]);

    if (responseError) {
    }
  }

  return {
    message: "Quiz answers submitted successfully",
    score: score,
    timeTaken: timeTaken,
  };
};
