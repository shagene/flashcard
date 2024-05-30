// src/pages/api/signout.ts
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "../../utils/cookies";

export default async function signout(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    setCookie(res, "userId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    return res.status(200).json({ message: "Signed out successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
