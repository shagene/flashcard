// src/pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { uuid } = req.body;

    if (!uuid) {
      return res.status(400).json({ error: "UUID is required" });
    }

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("email, role")
        .eq("id", uuid)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Failed to fetch user" });
      }

      if (user) {
        return res.status(200).json({
          message: "Sign in successful",
          email: user.email,
          role: user.role,
        });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return res.status(500).json({ error: "Failed to sign in" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
