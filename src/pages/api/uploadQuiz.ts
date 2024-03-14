// pages/api/uploadQuiz.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const title = fields.title as string;
      // Assuming the file handling for CSV is done here or elsewhere as needed
      const { data, error } = await supabase
        .from("quizzes")
        .insert([{ title }])
        .single();

      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(200).json({ quizId: (data as any).id });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
