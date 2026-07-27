import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import dns, { setServers } from "dns";
import userRoutes from "./routes/user.js";
import { createClient } from "redis";
import cookieParser from "cookie-parser";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectDb();

const redis_url = process.env.REDIS_URL; // from upsatash



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
app.use(cookieParser());

app.use("/api/v1", userRoutes);

app.listen(port, () => {
  console.log(`this port is running on port : ${port}`);
});
