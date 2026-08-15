import mongoose from "mongoose";
import { User } from "../models/user.model";
import { env } from "./env";

const CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  authSource: "admin",
} as const;

const MAX_CONNECT_ATTEMPTS = 10;
const RETRY_DELAY_MS = 1000;

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const connectDb = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState === 1) {
    return;
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_CONNECT_ATTEMPTS; attempt += 1) {
    try {
      await mongoose.connect(env.mongoUri, CONNECT_OPTIONS);
      await User.init();
      console.log("Database connected");
      return;
    } catch (err) {
      lastError = err;
      console.error(
        `Database connection attempt ${attempt}/${MAX_CONNECT_ATTEMPTS} failed`
      );

      if (attempt < MAX_CONNECT_ATTEMPTS) {
        await wait(RETRY_DELAY_MS);
      }
    }
  }

  throw lastError;
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
};
