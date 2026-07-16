import express from "express";
import dotenv, { configDotenv } from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 2000;

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "yes you are in health route",
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hii ayush this side",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
});
