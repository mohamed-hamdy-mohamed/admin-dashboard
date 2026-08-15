import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { User, type UserRole } from "../models/user.model";
import { AppError } from "../utils/AppError";
import { signToken, SESSION_JWT_EXPIRES_IN } from "../utils/jwt";
import { env } from "../config/env";
import {
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "./mail.service";
import {
  createEmailVerificationToken,
  hashEmailVerificationToken,
} from "../utils/emailVerification";
import {
  createPasswordResetToken,
  hashPasswordResetToken,
} from "../utils/passwordReset";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SALT_ROUNDS = 12;

type RegisterInput = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  password?: unknown;
};

const isDuplicateKeyError = (err: unknown) =>
  typeof err === "object" &&
  err !== null &&
  "code" in err &&
  (err as { code: unknown }).code === 11000;

const validateNamePart = (value: unknown, label: string) => {
  const namePart = typeof value === "string" ? value.trim() : "";

  if (!namePart) {
    throw new AppError(`${label} is required`, 400);
  }

  if (namePart.length < 1 || namePart.length > 50) {
    throw new AppError(`${label} must be between 1 and 50 characters`, 400);
  }

  return namePart;
};

const validateRegisterInput = (input: RegisterInput) => {
  const firstName = validateNamePart(input.firstName, "First name");
  const lastName = validateNamePart(input.lastName, "Last name");
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError("Please provide a valid email", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  if (password.length < 8 || password.length > 72) {
    throw new AppError("Password must be between 8 and 72 characters", 400);
  }

  return { firstName, lastName, email, password };
};

export const registerUser = async (input: RegisterInput) => {
  const { firstName, lastName, email, password } = validateRegisterInput(input);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already in use", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const verification = createEmailVerificationToken();

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      emailVerified: false,
      emailVerificationTokenHash: verification.tokenHash,
      emailVerificationExpiresAt: verification.expiresAt,
    });

    try {
      await sendVerificationEmail({
        to: email,
        firstName,
        verifyUrl: `${env.appUrl}/verify-email?token=${encodeURIComponent(verification.token)}`,
      });
    } catch (err) {
      await User.deleteOne({ _id: user._id });

      if (err instanceof AppError) {
        throw err;
      }

      throw new AppError("Failed to send verification email. Please try again.", 500);
    }

    return user.toJSON();
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      throw new AppError("Email already in use", 409);
    }

    throw err;
  }
};

type LoginInput = {
  email?: unknown;
  password?: unknown;
  rememberMe?: unknown;
};

const validateLoginInput = (input: LoginInput) => {
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const password = typeof input.password === "string" ? input.password : "";
  const rememberMe = input.rememberMe === true || input.rememberMe === "true";

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError("Please provide a valid email", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  return { email, password, rememberMe };
};

const validatePassword = (password: unknown, label = "Password") => {
  const value = typeof password === "string" ? password : "";

  if (!value) {
    throw new AppError(`${label} is required`, 400);
  }

  if (value.length < 8 || value.length > 72) {
    throw new AppError(`${label} must be between 8 and 72 characters`, 400);
  }

  return value;
};

export const loginUser = async (input: LoginInput) => {
  const { email, password, rememberMe } = validateLoginInput(input);

  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new AppError("Account not found. Please create an account first.", 404);
  }

  if (!user.passwordHash) {
    throw new AppError("Incorrect password.", 401);
  }

  const isMatch = await bcrypt.compare(password, String(user.passwordHash));
  if (!isMatch) {
    throw new AppError("Incorrect password.", 401);
  }

  if (user.emailVerified === false) {
    throw new AppError("Please verify your email before signing in.", 403);
  }

  const token = signToken(
    {
      userId: String(user._id),
      role: user.role as UserRole,
    },
    rememberMe ? env.jwtExpiresIn : SESSION_JWT_EXPIRES_IN,
  );

  return {
    token,
    user: user.toJSON(),
  };
};

type ForgotPasswordInput = {
  email?: unknown;
};

const validateForgotPasswordInput = (input: ForgotPasswordInput) => {
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new AppError("Please provide a valid email", 400);
  }

  return email;
};

export const requestPasswordReset = async (input: ForgotPasswordInput) => {
  const email = validateForgotPasswordInput(input);
  const user = await User.findOne({ email }).select(
    "+passwordResetTokenHash +passwordResetExpiresAt"
  );

  if (!user) {
    throw new AppError("Account does not exist", 404);
  }

  const reset = createPasswordResetToken();

  user.passwordResetTokenHash = reset.tokenHash;
  user.passwordResetExpiresAt = reset.expiresAt;
  await user.save();

  try {
    await sendPasswordResetEmail({
      to: email,
      firstName: String(user.firstName || "there"),
      resetUrl: `${env.appUrl}/reset-password?token=${encodeURIComponent(reset.token)}`,
    });
  } catch (err) {
    user.passwordResetTokenHash = null;
    user.passwordResetExpiresAt = null;
    await user.save();

    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError("Failed to send password reset email. Please try again.", 500);
  }
};

type ResetPasswordInput = {
  token?: unknown;
  password?: unknown;
};

export const resetPassword = async (input: ResetPasswordInput) => {
  const token = typeof input.token === "string" ? input.token.trim() : "";
  const password = validatePassword(input.password, "Password");

  if (!token) {
    throw new AppError("Reset token is required", 400);
  }

  const tokenHash = hashPasswordResetToken(token);
  const user = await User.findOne({ passwordResetTokenHash: tokenHash }).select(
    "+passwordHash +passwordResetTokenHash +passwordResetExpiresAt"
  );

  if (!user) {
    throw new AppError("Reset link is invalid or has expired.", 400);
  }

  const expiresAt = user.passwordResetExpiresAt
    ? new Date(String(user.passwordResetExpiresAt)).getTime()
    : 0;

  if (!expiresAt || expiresAt < Date.now()) {
    user.passwordResetTokenHash = null;
    user.passwordResetExpiresAt = null;
    await user.save();
    throw new AppError("Reset link is invalid or has expired.", 400);
  }

  user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  user.passwordResetTokenHash = null;
  user.passwordResetExpiresAt = null;
  await user.save();
};

type ChangePasswordInput = {
  currentPassword?: unknown;
  newPassword?: unknown;
};

export const changePassword = async (userId: string, input: ChangePasswordInput) => {
  const currentPassword = typeof input.currentPassword === "string" ? input.currentPassword : "";
  const newPassword = validatePassword(input.newPassword, "New password");

  if (!currentPassword) {
    throw new AppError("Current password is required", 400);
  }

  if (currentPassword === newPassword) {
    throw new AppError("New password must be different from the current password", 400);
  }

  const user = await User.findById(userId).select(
    "+passwordHash +passwordResetTokenHash +passwordResetExpiresAt"
  );
  if (!user) {
    throw new AppError("Authentication required", 401);
  }

  if (!user.passwordHash) {
    throw new AppError("Incorrect password.", 401);
  }

  const isMatch = await bcrypt.compare(currentPassword, String(user.passwordHash));
  if (!isMatch) {
    throw new AppError("Incorrect password.", 401);
  }

  user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.passwordResetTokenHash = null;
  user.passwordResetExpiresAt = null;
  await user.save();

  try {
    await sendPasswordChangedEmail({
      to: String(user.email),
      firstName: String(user.firstName || "there"),
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      "Password updated, but the confirmation email could not be sent.",
      500
    );
  }
};

type VerifyEmailInput = {
  token?: unknown;
};

export const verifyEmail = async (input: VerifyEmailInput) => {
  const token = typeof input.token === "string" ? input.token.trim() : "";

  if (!token) {
    throw new AppError("Verification token is required", 400);
  }

  const tokenHash = hashEmailVerificationToken(token);
  const user = await User.findOne({ emailVerificationTokenHash: tokenHash }).select(
    "+emailVerificationTokenHash +emailVerificationExpiresAt"
  );

  if (!user) {
    throw new AppError("Verification link is invalid or has expired.", 400);
  }

  if (user.emailVerified === true) {
    return { alreadyVerified: true as const };
  }

  const expiresAt = user.emailVerificationExpiresAt
    ? new Date(String(user.emailVerificationExpiresAt)).getTime()
    : 0;

  if (!expiresAt || expiresAt < Date.now()) {
    user.emailVerificationTokenHash = null;
    user.emailVerificationExpiresAt = null;
    await user.save();
    throw new AppError("Verification link is invalid or has expired.", 400);
  }

  user.emailVerified = true;
  user.emailVerificationExpiresAt = null;
  await user.save();

  return { alreadyVerified: false as const };
};

export const getVerificationStatus = async (input: ForgotPasswordInput) => {
  const email = validateForgotPasswordInput(input);
  const user = await User.findOne({ email });

  return {
    emailVerified: user?.emailVerified === true,
  };
};

export const resendVerificationEmail = async (input: ForgotPasswordInput) => {
  const email = validateForgotPasswordInput(input);
  const user = await User.findOne({ email }).select(
    "+emailVerificationTokenHash +emailVerificationExpiresAt"
  );

  if (!user) {
    throw new AppError("Account does not exist", 404);
  }

  if (user.emailVerified !== false) {
    throw new AppError("Email is already verified.", 400);
  }

  const verification = createEmailVerificationToken();

  const updated = await User.findOneAndUpdate(
    { _id: user._id, emailVerified: false },
    {
      $set: {
        emailVerificationTokenHash: verification.tokenHash,
        emailVerificationExpiresAt: verification.expiresAt,
      },
    },
    { returnDocument: "after" }
  );

  if (!updated) {
    throw new AppError("Email is already verified.", 400);
  }

  try {
    await sendVerificationEmail({
      to: email,
      firstName: String(user.firstName || "there"),
      verifyUrl: `${env.appUrl}/verify-email?token=${encodeURIComponent(verification.token)}`,
    });
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError("Failed to send verification email. Please try again.", 500);
  }
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("Authentication required", 401);
  }

  return user.toJSON();
};

type ProfileInput = {
  firstName?: unknown;
  lastName?: unknown;
};

const validateProfileInput = (input: ProfileInput) => {
  const firstName = validateNamePart(input.firstName, "First name");
  const lastName = validateNamePart(input.lastName, "Last name");

  return { firstName, lastName };
};

export const updateProfile = async (userId: string, input: ProfileInput) => {
  const { firstName, lastName } = validateProfileInput(input);

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("Authentication required", 401);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  await user.save();

  return user.toJSON();
};

export const updateUserAvatar = async (userId: string, avatarPath: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("Authentication required", 401);
  }

  const previousAvatar = typeof user.avatar === "string" ? user.avatar : null;
  user.avatar = avatarPath;
  await user.save();

  if (previousAvatar?.startsWith("/uploads/avatars/")) {
    const previousFile = path.join(
      __dirname,
      "../..",
      previousAvatar.replace(/^\//, "")
    );

    fs.unlink(previousFile, () => undefined);
  }

  return user.toJSON();
};
