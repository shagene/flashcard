// src/pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";
import { setCookie } from "@/utils/cookies";

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
        setCookie(res, "userId", uuid, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
          sameSite: "lax", // Add SameSite attribute
        });

        return res.status(200).json({
          message: "Sign in successful",
          uuid,
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
