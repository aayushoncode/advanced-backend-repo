import express from "express";
import dotenv from "dotenv";
import {
  Annotation,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { ToolNode } from "@langchain/langgraph/prebuilt";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

// const state = Annotation.Root({
//   promt: Annotation,
//   aimsg: Annotation,
// });

const tool = new TavilySearch({
  maxResults: 5,
  topic: "general",
});

const tools = [tool];

const toolnode = new ToolNode(tools);

const llm = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0,
  maxTokens: 100,
  maxRetries: 5,
}).bindTools(tools);

const callLLM = async (state) => {
  const response = await llm.invoke([
    {
      role: "system",
      content:
        "you are ai assistant and your name is jarvis and if you don't know the answer call relevent tool",
    },

    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};

const shouldContinue = async (state) => {
  const LastMessage = state.messages[state.messages.length - 1];

  console.log(LastMessage);

  if (LastMessage.tool_calls.length) {
    return "tools";
  } else {
    return "__end__";
  }
};

const graph = new StateGraph(MessagesAnnotation)
  .addNode("agent", callLLM)
  .addNode("tools", toolnode)
  .addEdge("__start__", "agent")
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .compile();

app.post("/ai", async (req, res) => {
  const { input } = req.body;

  const response = await graph.invoke({
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });

  console.log(response.messages[response.messages.length - 1].content);

  return res.status(200).json({
    ai: response.messages[response.messages.length - 1].content,
  });
});

app.get("/", (req, res) => {
  return res.json({
    message: "hi this is ayush",
  });
});

app.listen(PORT, () => {
  console.log("server is running on port : ", PORT);
});
