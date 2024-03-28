// pages/api/quizApi.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Extract quizId from query parameters
    const { quizId } = req.query;
    // Check if quizId is provided in the query parameters
    if (!quizId) {
      return res.status(400).json({ error: "quizId is required" });
    }

    // Fetch quiz details from the Supabase database
    const quizDetails = await fetchQuizDetails(quizId);

    // If quiz details are not found, return an appropriate response
    if (!quizDetails) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Respond with the quiz details
    res.status(200).json({ quizDetails });
  } else if (req.method === "POST") {
    // Extract quizId and answers from request body
    const { quizId, answers } = req.body;

    // Submit the answers to the server and get the results
    const result = await submitQuizAnswers(quizId, answers);

    // Respond with the result of the submission
    res.status(200).json({ result });
  } else {
    // Set the allowed HTTP methods for this API route
    res.setHeader("Allow", ["GET", "POST"]);

    // Return a 405 Method Not Allowed error for unsupported HTTP methods
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const fetchQuizDetails = async (
  quizId: string | string[] | undefined,
) => {
  if (!quizId) return null;
  let { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("quiz_id", quizId);

  if (error) {
    console.error("Error fetching quiz details:", error);
    return null;
  }

  return data;
};

export const submitQuizAnswers = async (
  quizId: string | string[] | undefined,
  answers: string | string[] | undefined,
) => {
  // Implement the actual submission logic here.
  // For demonstration, we'll just return a success message.
  return { message: "Quiz answers submitted successfully" };
};
