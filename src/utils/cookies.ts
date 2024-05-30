// src/utils/cookies.ts
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions = {},
) => {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);

  res.setHeader("Set-Cookie", cookie.serialize(name, stringValue, options));
};

export const getCookie = (req: NextApiRequest, name: string) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  return cookies[name];
};
