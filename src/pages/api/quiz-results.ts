// File: src/pages/api/quiz-results.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, error } = await supabase.from("user_detail_report").select("*");
  if (data) {
  }

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json(data);
}
