import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_AUTHENTICATION",
        });
    console.log("mongo_db connected successfully");
  } catch (error) {
    console.log("failed to connect", error);
  }
};

export default connectDb;
