// src/pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Signin API called with body:", req.body); // Log the request body
  if (req.method === "POST") {
    const { uuid } = req.body;

    if (!uuid) {
      return res.status(400).json({ error: "UUID is required" });
    }

    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("id", uuid)
      .single();

    console.log("Signin API response data:", data); // Log the response data
    console.log("Signin API error:", error); // Log any error

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data) {
      // Assuming you're sending the email back to the client
      return res
        .status(200)
        .json({ message: "Sign in successful", email: data.email });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
