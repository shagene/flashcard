import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
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
  } catch (error) {
    // console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const fetchQuizDetails = async (
  quizId: string | string[] | undefined,
) => {
  try {
    if (!quizId) {
      return null;
    }

    let { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quizId);

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const submitQuizAnswers = async (
  quizId: string | string[] | undefined,
  answers:
    | Array<{ questionId: string; selectedAnswer: string; isCorrect: boolean }>
    | undefined,
  timeTaken: string,
  userId: string,
) => {
  try {
    let totalQuestions = answers?.length ?? 0;
    let correctAnswers =
      answers?.filter((answer) => answer.isCorrect).length ?? 0;
    let score =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;

    const insertResponse = await supabase.from("user_quiz_attempts").insert({
      user_id: userId,
      quiz_id: quizId,
      attempt_timestamp: new Date().toISOString(),
      score: score,
      time_taken: timeTaken, // Ensure this is a string that represents the time taken in a consistent format
    });

    const { data: insertData, error: insertError } = insertResponse;

    if (insertError) {
      return { error: insertError.message };
    }

    const { data: attemptData, error: fetchError } = await supabase
      .from("user_quiz_attempts")
      .select("attempt_id")
      .eq("user_id", userId)
      .eq("quiz_id", quizId)
      .order("attempt_timestamp", { ascending: false })
      .limit(1)
      .single();

    if (fetchError) {
      return { error: "Failed to retrieve attempt ID after insertion." };
    }

    const attemptId = attemptData?.attempt_id;
    if (!attemptId) {
      return { error: "Failed to retrieve attempt ID after insertion." };
    }

    if (answers && answers.length > 0) {
      for (const answer of answers) {
        const responsePayload = {
          attempt_id: attemptId,
          user_id: userId,
          quiz_id: quizId,
          question_id: answer.questionId,
          selected_answer:
            answer.selectedAnswer !== undefined &&
            answer.selectedAnswer !== null
              ? answer.selectedAnswer
              : "No Answer Selected",
          is_correct: answer.isCorrect,
          created_at: new Date().toISOString(),
        };

        const { error: responseError } = await supabase
          .from("user_quiz_responses")
          .insert([responsePayload]);

        if (responseError) {
          return { error: "failed to insert into user_quiz_responses" };
        }
      }
    } else {
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("id")
        .eq("quiz_id", quizId);

      if (questionsError) {
        return { error: "failed to fetch questions" };
      }
      for (const question of questions) {
        const responsePayload = {
          attempt_id: attemptId,
          user_id: userId,
          quiz_id: quizId,
          question_id: question.id,
          selected_answer: "",
          is_correct: false,
          created_at: new Date().toISOString(),
        };
        const { error: responseError } = await supabase
          .from("user_quiz_responses")
          .insert([responsePayload]);

        if (responseError) {
          return { error: "failed to insert into user_quiz_responses" };
        }
      }
    }
    return {
      message: "Quiz answers submitted successfully",
      score: score,
      timeTaken: timeTaken,
    };
  } catch (error) {
    throw error;
  }
};
