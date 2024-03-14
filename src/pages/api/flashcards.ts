// pages/api/flashcards.js
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { flashcards } = req.body;
    const { error } = await supabase.from("flashcards").insert(flashcards);

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ message: "Flashcards uploaded successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
