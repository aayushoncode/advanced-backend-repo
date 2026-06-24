import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { ChatGroq } from "@langchain/groq";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 7000;

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// app.post("/ai", async (req, res) => {
//   const { input } = req.body;
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: [
//       {
//         role: "system",
//         parts: [{ text: "you are assistant and your name is jarvis " }],
//       },

//       {
//         role: "user",
//         parts: [{ text: input }],
//       },
//     ],
//   });

//   return res.status(200).json({
//     " ai : ": response.text,
//   });
// });

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
});

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await llm.invoke(input);

  return res.status(200).json({
    "ai : ": response.content,
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hii guys this is ayush",
  });
});

app.listen(PORT, () => {
  return console.log("server is running on port :", PORT);
});
