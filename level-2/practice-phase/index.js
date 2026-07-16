import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "welcome to this site",
  });
});

app.listen(port, () => {
  console.log("server is running on port : ", port);
});


