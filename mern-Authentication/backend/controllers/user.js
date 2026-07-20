import sanitize from "mongo-sanitize";
import TryCatch from "../middlewares/TryCatch.js";
import { registerSchema } from "../config/zod.js";

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

  res.json({
    name,
    email,
    password,
  });
});
