import app from "./app";
import { connectDb, disconnectDb } from "./config/db";
import { env } from "./config/env";

const start = async () => {
  await connectDb();

  const server = app.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });

  server.on("error", (err) => {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received. Shutting down...`);
    server.close(() => {
      void disconnectDb().then(() => process.exit(0));
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
  });
};

void start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
