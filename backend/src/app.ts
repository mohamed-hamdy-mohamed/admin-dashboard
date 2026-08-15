import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { env } from "./config/env";
import routes from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/error-handler";

const uploadsDir = path.join(__dirname, "../uploads");
const avatarsDir = path.join(uploadsDir, "avatars");

fs.mkdirSync(avatarsDir, { recursive: true });

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: "10kb" }));
app.use(
  "/uploads",
  express.static(uploadsDir, {
    setHeaders(res) {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
