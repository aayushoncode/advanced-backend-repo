import { connect } from "mongoose";
import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB);
  console.log("mongodb connected successfully");
};

export default connectDB;
