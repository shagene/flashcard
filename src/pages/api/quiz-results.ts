// File: src/pages/api/quiz-results.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Use the user ID to filter the view data
  const { data, error } = await supabase
    .from("user_detail_report")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
}
