import type { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { env } from "../config/env";

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Avatar must be smaller than 2MB"
        : err.message;

    res.status(400).json({
      success: false,
      message,
    });
    return;
  }

  const isDbConnectionError =
    err.name === "MongooseServerSelectionError" ||
    err.name === "MongoServerSelectionError" ||
    err.name === "MongoNetworkError" ||
    /ECONNREFUSED/.test(err.message);

  if (isDbConnectionError) {
    res.status(503).json({
      success: false,
      message: "Database unavailable. Please try again.",
    });
    return;
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(env.nodeEnv === "development" && { stack: err.stack }),
  });
};
