// src/pages/api/getQuizzes.ts

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const userId = req.headers.userid;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
