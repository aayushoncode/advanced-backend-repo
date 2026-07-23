import jwt from "jsonwebtoken";
import { redis_client } from "../index.js";

export const generateToken = async (id, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_SECRET || process.env.REFESH_SECRET;

  if (!jwtSecret || !refreshSecret) {
    throw new Error("JWT_SECRET or REFRESH_SECRET is missing");
  }

  const accessToken = jwt.sign({ id }, jwtSecret, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign({ id }, refreshSecret, {
    expiresIn: "7d",
  });

  const refreshTokenKey = `refresh_token:${id}`;

  await redis_client.setEx(refreshTokenKey, 7 * 24 * 60 * 60, refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "strict",
    maxAge: 1 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    // secure: true
  });

  return { accessToken, refreshToken };
};
