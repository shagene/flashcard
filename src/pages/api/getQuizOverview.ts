import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

/**
 * API route handler for retrieving user quiz overview data.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {NextApiResponse} res - The Next.js API response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // Extract userId from query parameters
    const { userId } = req.query;
    // Check if userId is provided in the query parameters
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // Retrieve user quiz overview data from the Supabase database
    const { data, error } = await supabase
      .from("user_quiz_overview")
      .select("*")
      .eq("user_id", userId);

    // Handle any errors that occurred during the database query
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
    // Set the allowed HTTP methods for this API route
    res.setHeader("Allow", ["GET"]);

    // Return a 405 Method Not Allowed error for unsupported HTTP methods
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
