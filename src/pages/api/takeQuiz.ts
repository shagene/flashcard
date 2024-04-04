import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log("Request method:", req.method);
    console.log("Request query:", req.query);
    console.log("Request body:", req.body);

    if (req.method === "GET") {
      const { quizId } = req.query;
      if (!quizId) {
        console.log("quizId is missing in the request query");
        return res.status(400).json({ error: "quizId is required" });
      }

      console.log("Fetching quiz details...");
      const quizDetails = await fetchQuizDetails(quizId);

      if (!quizDetails) {
        console.log("Quiz not found");
        return res.status(404).json({ error: "Quiz not found" });
      }

      console.log("Quiz details fetched:", quizDetails);
      res.status(200).json({ quizDetails });
    } else if (req.method === "POST") {
      const { quizId, answers } = req.body;
      if (!req.body.userId) {
        console.log("userId is missing in the request body");
        return res.status(400).json({ error: "userId is required" });
      }
      console.log("Submitting quiz answers...");
      console.log("quizId:", quizId);
      console.log("answers:", answers);
      console.log("timeTaken:", req.body.timeTaken);
      console.log("userId:", req.body.userId);

      const result = await submitQuizAnswers(
        quizId,
        answers,
        req.body.timeTaken,
        req.body.userId,
      );
      console.log("Quiz answers submitted:", result);
      res.status(200).json({ result });
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const fetchQuizDetails = async (
  quizId: string | string[] | undefined,
) => {
  try {
    if (!quizId) {
      console.log("quizId is missing");
      return null;
    }
    console.log("Fetching quiz details from the database...");
    console.log("quizId:", quizId);

    let { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("quiz_id", quizId);

    if (error) {
      console.error("Error fetching quiz details:", error);
      return null;
    }

    console.log("Quiz details fetched successfully");
    return data;
  } catch (error) {
    console.error("Error in fetchQuizDetails:", error);
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

    console.log("Inserting quiz attempt into the database...");
    console.log("userId:", userId);
    console.log("quizId:", quizId);
    console.log("score:", score);
    console.log("timeTaken:", timeTaken);

    const insertResponse = await supabase.from("user_quiz_attempts").insert({
      user_id: userId,
      quiz_id: quizId,
      attempt_timestamp: new Date().toISOString(),
      score: score,
      time_taken: timeTaken,
    });

    const { data: insertData, error: insertError } = insertResponse;

    if (insertError) {
      console.error("Error inserting quiz attempt:", insertError);
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
      console.error("Error fetching attempt ID:", fetchError);
      return { error: "Failed to retrieve attempt ID after insertion." };
    }

    const attemptId = attemptData?.attempt_id;
    if (!attemptId) {
      console.log("Failed to retrieve attempt ID after insertion");
      return { error: "Failed to retrieve attempt ID after insertion." };
    }

    console.log("Quiz attempt inserted successfully");
    console.log("attemptId:", attemptId);

    if (answers && answers.length > 0) {
      // Insert quiz responses for provided answers
      for (const answer of answers) {
        console.log("Answer object:", answer);
        const responsePayload = {
          attempt_id: attemptId,
          user_id: userId,
          quiz_id: quizId,
          question_id: answer.questionId,
          selected_answer:
            answer.selectedAnswer !== undefined &&
            answer.selectedAnswer !== null
              ? answer.selectedAnswer
              : "",
          is_correct: answer.isCorrect,
          created_at: new Date().toISOString(),
        };

        console.log("Inserting quiz response into the database...");
        console.log("responsePayload:", responsePayload);

        const { error: responseError } = await supabase
          .from("user_quiz_responses")
          .insert([responsePayload]);

        if (responseError) {
          console.error(
            "Failed to insert into user_quiz_responses:",
            responseError,
          );
          return { error: "failed to insert into user_quiz_responses" };
        }
        console.log("Quiz response inserted successfully");
      }
    } else {
      // Fetch all questions for the quiz
      const { data: questions, error: questionsError } = await supabase
        .from("questions")
        .select("id")
        .eq("quiz_id", quizId);

      if (questionsError) {
        console.error("Failed to fetch questions:", questionsError);
        return { error: "failed to fetch questions" };
      }

      // Insert default quiz responses for each question
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

        console.log("Inserting default quiz response into the database...");
        console.log("responsePayload:", responsePayload);

        const { error: responseError } = await supabase
          .from("user_quiz_responses")
          .insert([responsePayload]);

        if (responseError) {
          console.error(
            "Failed to insert into user_quiz_responses:",
            responseError,
          );
          return { error: "failed to insert into user_quiz_responses" };
        }
        console.log("Default quiz response inserted successfully");
      }
    }

    console.log("Quiz answers submitted successfully");
    return {
      message: "Quiz answers submitted successfully",
      score: score,
      timeTaken: timeTaken,
    };
  } catch (error) {
    console.error("Error in submitQuizAnswers:", error);
    throw error;
  }
};
