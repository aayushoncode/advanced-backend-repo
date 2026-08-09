import crypto from "crypto";
import { redis_client } from "..";

export const generateCSRFToken = async (userId, res) => {
  const csrfToken = crypto.randomBytes(32).toString("hex");

  const csrfKey = `csrf:${userId}`;

  await redis_client.setEx(csrfKey, 3600, csrfToken);

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 1000,

  });

  return csrfToken

};



