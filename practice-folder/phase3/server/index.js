import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import dns from "dns"; 
import User from "./models/user.js";
// import Redis from "ioredis";
import { stringify } from "querystring";
// import ratelimmiter from "./middleware/ratelimmiter.js";
// import { sendEmail } from "./lib/sendEmail.js";
// import emailQueue from "./queue.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

// const redis = new Redis(process.env.REDIS_URL);

// export default redis;

app.use(express.json());
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: `hello from server ${process.env.SERVER_NAME}`,
  });
});

// app.post("/create", async (req, res) => {
//   const { name, email, password } = req.body;
//   await redis.del("user:all");
//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   await emailQueue.add("send-email", { email });

//   return res.json({ user, message: "successfully signup" });
// });
// app.get("/get", async (req, res) => {
//   const user = await User.find({});
//   return res.json(user);
// });

// app.get("/get-with-redis", ratelimmiter, async (req, res) => {
//   const cached = await redis.get("user:all");

//   if (cached) {
//     const user = JSON.parse(cached);
//     return res.json(user);
//   }

//   const user = await User.find({});

//   await redis.set("user:all", JSON.stringify(user));

//   return res.json(user);
// });

// app.post("/send-otp", async (req, res) => {
//   const { email } = req.body;

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   await redis.set(`otp:${email}`, otp, "EX", 100);
//   return res.json({
//     otp,
//   });
// });

// app.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   const cachedOtp = await redis.get(`otp:${email}`);

//   if (!cachedOtp) {
//     res.status(400).json({
//       message: "otp not found or expired",
//     });
//   }
//   if (cachedOtp != otp) {
//     res.status(400).json({
//       message: "otp incorrect",
//     });
//   }
//   return res.status(200).json({
//     message: "otp-verified",
//   });
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
