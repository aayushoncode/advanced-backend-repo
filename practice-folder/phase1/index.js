import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hii this ayush",
  });
});

app.listen(PORT, () => {
  console.log("the server is running on port : ", PORT);
});
