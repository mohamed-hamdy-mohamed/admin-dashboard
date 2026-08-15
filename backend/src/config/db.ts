import mongoose from "mongoose";
import { User } from "../models/user.model";
import { env } from "./env";

export const connectDb = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(env.mongoUri);
  await User.init();
  console.log("Database connected");
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
