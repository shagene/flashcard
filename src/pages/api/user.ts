// src/pages/api/user.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import { getCookie } from "../../utils/cookies";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = getCookie(req, "userId");

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("email")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Failed to fetch user" });
      }

      if (user) {
        return res.status(200).json({ email: user.email });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
