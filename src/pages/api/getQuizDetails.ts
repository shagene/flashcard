// src/pages/api/getQuizDetails.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

const getQuizDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const quizAttemptId = req.query.quizAttemptId as string;

  if (!quizAttemptId) {
    console.error("No Quiz Attempt ID provided");
    res.status(400).json({ error: "Quiz Attempt ID is required" });
    return;
  }

  console.log("Quiz Attempt ID:", quizAttemptId); // Log the Quiz Attempt ID

  try {
    const query = supabase
      .from("user_quiz_responses")
      .select("*")
      .eq("attempt_id", quizAttemptId)
      .single();

    console.log("Supabase Query:", JSON.stringify(query)); // Log the query

    const { data, error } = await query;

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (!data) {
      res.status(404).json({ error: "No quiz details found for this ID" });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getQuizDetails;
