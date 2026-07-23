import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import dns, { setServers } from "dns";
import userRoutes from "./routes/user.js";
import { createClient } from "redis";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectDb();

const redis_url = process.env.REDIS_URL;

if (!redis_url) {
  console.log("redis url is missing");
  process.exit(1);
}

export const redis_client = createClient({
  url: redis_url,
});

redis_client
  .connect()
  .then(() => console.log("redis connected"))
  .catch(console.error);
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1", userRoutes);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "hi this ayush ",
//   });
// });

app.listen(port, () => {
  console.log(`this port is running on port : ${port}`);
});
