import express from "express";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import fs from "fs";
import { PDFParse } from "pdf-parse";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { QdrantVectorStore } from "@langchain/qdrant";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

// const state = Annotation.Root({
//   promt: Annotation,
//   aimsg: Annotation,
// });

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  maxTokens: 100,
  maxRetries: 5,
});

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001", // 768 dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: process.env.QDRANT_URL,
  collectionName: "grocery-store",
});

const upload_pdf = async () => {
  const pdfPath = "./knowledge.pdf"; // location of pdf
  const buffer = fs.readFileSync(pdfPath); // converts text into bytes(00011,100...)
  const pdfResult = new PDFParse({ data: buffer }); // prepare to extract text
  const result = await pdfResult.getText(); // extract the text ,it reads every page
  const text = result.text; // the actual text(only)

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  }); // llm cannot process huge document data efficiently ---> poor retrieval
  // small chunks ---->  better retrieval
  const docs = await splitter.createDocuments([text]); // the chunks get stored in array
  // and all were stored in docs
  const vector = await vectorStore.addDocuments(docs);

  console.log("document uploaded successfully");
};
upload_pdf();

app.post("/ai", async (req, res) => {
  const { input } = req.body;
  const docs = await vectorStore.similaritySearch(input);
  const context = docs.map((d) => d.pageContent).join("\n");

  const response = await llm.invoke([
    new SystemMessage(`
      you are a RAG ai assistant .

      STRICT RULES : 

      - ANSWER ONLY from context
      - do not use outside knowledge
      - if answer not found say : 
      "I dont know from uploaded pdf"

      context : ${context}
      
      `),
    new HumanMessage(input),
  ]);

  return res.status(200).json({ ai: response.content });
});

app.get("/", (req, res) => {
  return res.json({
    message: "hi this is ayush",
  });
});

app.listen(PORT, () => {
  console.log("server is running on port : ", PORT);
});
