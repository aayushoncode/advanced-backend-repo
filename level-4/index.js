// import express from "express";
// import dotenv from "dotenv";
// import { GoogleGenAI } from "@google/genai";
// import { ChatGroq } from "@langchain/groq";
// import {
//   Annotation,
//   MessagesAnnotation,
//   StateGraph,
// } from "@langchain/langgraph";
// import { ToolNode } from "@langchain/langgraph/prebuilt";
// import { TavilySearch } from "@langchain/tavily";

// dotenv.config();
// const app = express();

// app.use(express.json());

// const PORT = process.env.PORT || 7000;

// // const ai = new GoogleGenAI({
// //   apiKey: process.env.GEMINI_API_KEY,
// // });

// // app.post("/ai", async (req, res) => {
// //   const { input } = req.body;
// //   const response = await ai.models.generateContent({
// //     model: "gemini-3.5-flash",
// //     contents: [
// //       {
// //         role: "system",
// //         parts: [{ text: "you are assistant and your name is jarvis " }],
// //       },

// //       {
// //         role: "user",
// //         parts: [{ text: input }],
// //       },
// //     ],
// //   });

// //   return res.status(200).json({
// //     " ai : ": response.text,
// //   });
// // });

// const tool = new TavilySearch({
//   maxResults: 5,
//   topic: "general",
// });

// const tools = [tool];

// const toolNode = new ToolNode(tools);

// const llm = new ChatGroq({
//   model: "llama-3.3-70b-versatile",
//   temperature: 0,
//   maxRetries: 5,
//   maxTokens: 100,
// }).bindTools(tools);

// // const state = Annotation.Root({
// //   prompt: Annotation,
// //   aiMsg: Annotation,
// // });

// const callLLM = async (state) => {
//   console.log("state : ", state);

//   const response = await llm.invoke  [
//     {
//       role: "system",
//       content:
//         "you are ai assistant and your name is jarvis , if you don't know the answer then call relevent tool",
//     },

//     ...state.messages,
//   ]);

//   return { messages: [response] };
// };
// const shouldContinue = async (state) => {
//   const LastMessage = state.messages[state.messages.length - 1];

//   if (LastMessage.tool_calls.length) {
//     return "tools";
//   } else {
//     return "__end__";
//   }
// };
// const graph = new StateGraph(MessagesAnnotation)
//   .addNode("agent", callLLM)
//   .addNode("tools", toolNode)
//   .addEdge("__start__", "agent")
//   .addEdge("tools", "agent")
//   .addConditionalEdges("agent", shouldContinue)
//   .compile();

// app.post("/ai", async (req, res) => {
//   const { input } = req.body;

//   const response = await graph.invoke({
//     messages: [
//       {
//         role: "user",
//         content: input,
//       },
//     ],
//   });
//   console.log(response);
//   return res.status(200).json({
//     "ai : ": response.messages[response.messages.length - 1].content,
//   });
// });

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "hii guys this is ayush",
//   });
// });

// app.listen(PORT, () => {
//   return console.log("server is running on port :", PORT);
// });
