// pages/api/getTotalQuestionsFromQuiz.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { quizId } = req.query;
    const { data, error } = await supabase
      .from("flashcards")
      .select("id", { count: "exact" })
      .eq("quiz_id", quizId);

    if (error) return res.status(500).json({ error: error.message });
    const totalQuestions = data ? data.length : 0;
    res.status(200).json({ totalQuestions });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
