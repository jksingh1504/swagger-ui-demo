import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database is connected sucessfully");
  } catch (error) {
    console.log("🚀 ~ connectDB ~ error:", error);
  }
};
