// src/pages/api/signup.ts
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Signup API called with body:", req.body); // Log the request body
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const uuid = uuidv4();
    const { error } = await supabase
      .from("users")
      .insert([{ id: uuid, email }]);

    console.log("Signup API response:", { uuid, email }); // Log the response data
    console.log("Signup API error:", error); // Log any error

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    // Assuming you're sending the email back to the client
    return res.status(200).json({ uuid, email });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
