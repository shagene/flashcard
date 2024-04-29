// pages/api/quiz-attempt-details.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { attemptId } = req.query;

  if (!attemptId) {
    return res.status(400).json({ error: "Attempt ID is required" });
  }

  const { data, error } = await supabase
    .from("user_detail_report")
    .select("*")
    .eq("attempt_id", attemptId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
