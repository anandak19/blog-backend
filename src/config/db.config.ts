import mongoose from "mongoose";
import { appConfig } from "./app.config";

const connectDB = async () => {
  try {
    await mongoose.connect(appConfig.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.error("MongoDB connection error: ");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
