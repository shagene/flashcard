// src/pages/api/uploadQuiz.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient"; // Adjust the import path according to your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { title, user_id, questions } = req.body;

    // Insert quiz into quizzes table
    try {
      const { title, user_id, questions } = req.body;

      // Insert quiz into quizzes table
      interface QuizData {
        id: number;
      }

      const { data: quizData, error: quizError } = (await supabase
        .from("quizzes")
        .insert([{ title, user_id }])
        .single()) as { data: QuizData; error: any };

      if (quizError) throw quizError;

      const quizId = quizData.id;

      // Prepare questions for batch insert
      const flashcards = questions.map(
        (question: {
          question: any;
          correct_answer: any;
          incorrect_answers: any[];
        }) => ({
          quiz_id: quizId,
          question: question.question,
          correct_answer: question.correct_answer,
          incorrect_answer1: question.incorrect_answers[0],
          incorrect_answer2: question.incorrect_answers[1],
          incorrect_answer3: question.incorrect_answers[2],
        }),
      );

      // Insert questions into flashcards table
      const { error: flashcardsError } = await supabase
        .from("flashcards")
        .insert(flashcards);

      if (flashcardsError) throw flashcardsError;

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
