import sanitize from "mongo-sanitize";
import TryCatch from "../middlewares/TryCatch.js";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = sanitize(req.body);
  res.json({
    name,
    email,
    password,
  });
});
