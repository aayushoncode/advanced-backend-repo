import sanitize from "mongo-sanitize";
import TryCatch from "../middlewares/TryCatch.js";
import { registerSchema } from "../config/zod.js";
import { redis_client } from "../index.js";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import sendMail from "../config/sendMail.js";
import { getVerifyEmailHtml } from "../config/html.js";

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

  const rateLimitKey = `ragister rate limit:${req.ip}:${email}`;

  if (await redis_client.get(rateLimitKey)) {
    return res.status(429).json({
      message: "too many request, try again later",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "too many request, try again later",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const verifyKey = `verify:${verifyToken}`;

  const datatoStore = JSON.stringify({
    name,
    email,
    password: hashPassword,
  });

  await redis_client.set(verifyKey, datatoStore, { EX: 300 });

  const subject = "verify your email for account creation";

  const html = getVerifyEmailHtml({ email, token: verifyToken });

  await sendMail({ email, subject, html });

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
