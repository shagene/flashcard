import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Extract userId from query parameters
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const { data, error } = await supabase
      .from("user_quiz_overview")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // If data is not found or empty, it could be normal for new users or those without quizzes
    if (!data || data.length === 0) {
      return res
        .status(200)
        .json({ message: "No quizzes found for this user", quizzes: [] });
    }

    // Respond with the data for the user's quizzes
    res.status(200).json({ quizzes: data });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
