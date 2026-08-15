import type { Request, Response } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  requestPasswordReset,
  resendVerificationEmail,
  updateProfile,
  updateUserAvatar,
  verifyEmail,
} from "../services/auth.service";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully. Please verify your email.",
    data: { user },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { token, user } = await loginUser(req.body);

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: { token, user },
  });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await requestPasswordReset(req.body);

  res.status(200).json({
    success: true,
    message: "Password reset instructions have been sent",
  });
});

export const verifyEmailAddress = asyncHandler(async (req: Request, res: Response) => {
  await verifyEmail(req.body);

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
  await resendVerificationEmail(req.body);

  res.status(200).json({
    success: true,
    message: "Verification email has been sent",
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const user = await getCurrentUser(req.user.userId);

  res.status(200).json({
    success: true,
    data: { user },
  });
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  const user = await updateProfile(req.user.userId, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
});

export const uploadAvatar = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Authentication required", 401);
  }

  if (!req.file) {
    throw new AppError("Avatar file is required", 400);
  }

  const user = await updateUserAvatar(
    req.user.userId,
    `/uploads/avatars/${req.file.filename}`
  );

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data: { user },
  });
});
