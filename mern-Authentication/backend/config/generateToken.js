import jwt from "jsonwebtoken";
import { redis_client } from "../index.js";

export const generateToken = async (id, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_SECRET;
  console.log(jwtSecret, refreshSecret);

  if (!jwtSecret || !refreshSecret) {
    return res.status(400).json({
      message: "JWT_SECRET or REFRESH_SECRET is missing",
    });
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
    secure: true,
    sameSite: "strict",
    maxAge: 1 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return { accessToken, refreshToken };
};
export const verifyRefreshToken = async (refreshToken) => {
  try {
    const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const storedToken = await redis_client.get(`refresh_token:${decode.id}`);

    if (storedToken === refreshToken) {
      return decode;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generateAccessToken = async (id, res) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 1 * 60 * 1000,
  });
};

export const revokeRefreshToken = async (userId) => {
  await redis_client.del(`refresh_token${userId}`);
};
