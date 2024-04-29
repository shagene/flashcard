// src/pages/api/uploadQuiz.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient"; // Adjust the import path according to your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { title, user_id, questions } = req.body;

      // Attempt to insert the new quiz
      const insertResponse = await supabase
        .from("quizzes")
        .insert([{ title, user_id }])
        .single();

      // console.log("Insert response:", insertResponse); // Log the full response for debugging

      if (insertResponse.error) {
        console.error("Quiz insert error:", insertResponse.error);
        throw insertResponse.error;
      }

      // Fetch the latest quiz ID for the user
      const { data: latestQuiz, error: fetchError } = await supabase
        .from("quizzes")
        .select("id")
        .eq("user_id", user_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (fetchError || !latestQuiz) {
        console.error("Error fetching latest quiz ID:", fetchError);
        throw new Error("Failed to fetch latest quiz ID after insert");
      }

      const quizId = latestQuiz.id; // Use the fetched latest quiz ID
      // console.log("Latest quiz ID:", quizId);

      // Prepare questions for batch insert
      const questionsPrepared = questions.map(
        (question: {
          question: string;
          correct_answer: string;
          incorrect_answers: string[];
        }) => ({
          quiz_id: quizId, // Use fetched quiz ID for association
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answer1: question.incorrect_answers[0],
          incorrect_answer2: question.incorrect_answers[1],
          incorrect_answer3: question.incorrect_answers[2],
        }),
      );

      // Insert questions into questions table
      const questionsInsertResponse = await supabase
        .from("questions")
        .insert(questionsPrepared);

      if (questionsInsertResponse.error) {
        console.error("questions insert error:", questionsInsertResponse.error);
        throw questionsInsertResponse.error;
      }

      res
        .status(200)
        .json({ message: "Quiz and questions uploaded successfully" });
    } catch (error) {
      console.error("Error uploading quiz and questions:", error);
      res.status(500).json({ error: "Internal server error", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
