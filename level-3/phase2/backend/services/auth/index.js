import express from "express";
import dotenv from "dotenv";
// import { connect } from "mongoose";
// import connectDB from "./config/db/db.js";
import { setServers } from "dns";
import dns from "dns";
// import User from "../auth copy/models/user/user.js";

dotenv.config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 6000;

// connectDB();

app.get("/", (req, res) => {
  return res.json({
    message: ` hello from auth service ${process.env.SERVER_NAME}`,
  });
});

// app.post("/create", async (req, res) => {
//   const { name, email, password } = req.body;

//   const createUser = await User.create({
//     name,
//     email,
//     password,
//   });

//   return res.status(200).json({
//     message: "signup successfully !",
//   });
// });

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
