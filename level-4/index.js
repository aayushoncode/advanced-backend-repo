import express from "express";

const app = express();

app.use(express.json());

const PORT = 7000;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hii guys this is ayush",
  });
});

app.listen(PORT, () => {
  return console.log("server is running on port :", PORT);
});
