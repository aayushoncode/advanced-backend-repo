import sanitize from "mongo-sanitize";
import TryCatch from "../middlewares/TryCatch.js";
import { loginSchema, registerSchema } from "../config/zod.js";
import { redis_client } from "../index.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../config/sendMail.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";
import {
  generateAccessToken,
  generateToken,
  revokeRefreshToken,
  verifyRefreshToken,
} from "../config/generateToken.js";
import { RedisClient } from "redis";

export const registerUser = TryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  const validation = registerSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;

    let firstErrorMessage = "validation error";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "validation error",
        code: issue.code,
      }));

      firstErrorMessage = allErrors[0]?.message || "validation error  ";
    }

    return res.status(400).json({
      message: firstErrorMessage,
      error: allErrors,
    });
  }

  const { name, password, email } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  const rateLimitKey = `ragister rate limit:${req.ip}:${normalizedEmail}`;

  if (await redis_client.get(rateLimitKey)) {
    return res.status(429).json({
      message: "too many request, try again later",
    });
  }

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(400).json({
      message: "user already exist",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const verifyKey = `verify:${verifyToken}`;

  const datatoStore = JSON.stringify({
    name,
    email: normalizedEmail,
    password: hashPassword,
  });

  await redis_client.set(verifyKey, datatoStore, { EX: 300 });

  const subject = "verify your email for account creation";

  const html = getVerifyEmailHtml({
    email: normalizedEmail,
    token: verifyToken,
  });

  await sendMail({ email: normalizedEmail, subject, html });

  await redis_client.set(rateLimitKey, "true", { EX: 60 });

  res.json({
    message:
      "if your email is valid, a verification link has been sent. it will expire in 5 min",
  });
});

export const verify_User = TryCatch(async (req, res) => {
  const { token } = req.params;

  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: "verification token is required",
    });
  }

  const verify_key = `verify:${token}`;

  const userDataJson = await redis_client.get(verify_key);

  console.log(userDataJson);

  if (!userDataJson) {
    return res.status(400).json({
      message: "verification link is expired",
    });
  }

  await redis_client.del(verify_key);

  const userData = JSON.parse(userDataJson);

  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    return res.status(400).json({
      message: "too many request, try again later",
    });
  }

  const newUser = await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  res.status(201).json({
    message: "email is verified successfully! your account has been created",
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  const validation = loginSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;

    let firstErrorMessage = "validation error";
    let allErrors = [];

    if (zodError?.issues && Array.isArray(zodError.issues)) {
      allErrors = zodError.issues.map((issue) => ({
        field: issue.path ? issue.path.join(".") : "unknown",
        message: issue.message || "validation error",
        code: issue.code,
      }));

      firstErrorMessage = allErrors[0]?.message || "validation error  ";
    }

    return res.status(400).json({
      message: firstErrorMessage,
      error: allErrors,
    });
  }

  const { email, password } = validation.data;
  const normalizedEmail = email.toLowerCase().trim();

  const rateLimitKey = `login-rate-limit:${req.ip}:${normalizedEmail}`;

  if (await redis_client.get(rateLimitKey)) {
    return res.status(429).json({
      message: "too many request, try again later",
    });
  }

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({
      message: "invalid credentials",
    });
  }

  const otp = Math.floor(10000 + Math.random() * 900000).toString();

  const otpKey = `otp:${normalizedEmail}`;
  const legacyOtpKey = `otp:${email.trim()}`;

  await redis_client.set(otpKey, otp, { EX: 300 });
  await redis_client.set(legacyOtpKey, otp, { EX: 300 });

  console.log("OTP Key:", otpKey);
  console.log("Generated OTP:", otp);

  const value = await redis_client.get(otpKey);
  console.log("Saved Value:", value);

  const ttl = await redis_client.ttl(otpKey);
  console.log("TTL:", ttl);

  const subject = "otp verification";

  const html = getOtpHtml({ email: normalizedEmail, otp });

  await sendMail({ email: normalizedEmail, subject, html });

  await redis_client.set(rateLimitKey, "true", { EX: 60 });

  res.json({
    message:
      "if your email is valid, an otp  has been sent. it will expire in 5 min",
  });
});

export const verify_otp = TryCatch(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "please provie all details",
    });
  }

  const otpKey = `otp:${email}`;

  // console.log(otpKey);

  const storedOtpString = await redis_client.get(otpKey);

  console.log(storedOtpString);

  if (!storedOtpString) {
    return res.status(400).json({
      message: "otp expired",
    });
  }

  const storedOtp = JSON.parse(storedOtpString);

  if (storedOtp !== otp) {
    return res.status(400).json({
      message: "invalid otp",
    });
  }

  await redis_client.del(otpKey);

  let user = await User.findOne({ email });

  const tokenData = await generateToken(user._id, res);

  console.log(tokenData);

  res.status(200).json({
    message: `welcome : ${user.name}`,
    user,
    tokenData,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const userProfile = req.user;

  res.status(200).json({
    user: userProfile,
  });
});

export const refreshToken = TryCatch(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "invalid refresh token",
    });
  }

  const decode = await verifyRefreshToken(refreshToken);

  if (!decode) {
    return res.status(401).json({
      message: "invalid Refresh token456",
    });
  }

  await generateAccessToken(decode.id, res);

  res.status(200).json({
    message: "token refreshed",
  });
});

export const logOut = TryCatch(async (req, res) => {
  const userId = req.user._id;

  await revokeRefreshToken(userId);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  await redis_client.del(`user:${userId}`);

  res.json({
    message: "user logOut successfully",
  });
});
