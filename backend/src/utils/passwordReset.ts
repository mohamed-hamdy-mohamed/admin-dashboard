import crypto from "crypto";
import { hashEmailVerificationToken } from "./emailVerification";

const TOKEN_BYTES = 32;
export const PASSWORD_RESET_TTL_MS = 15 * 60 * 1000;

export const hashPasswordResetToken = hashEmailVerificationToken;

export const createPasswordResetToken = () => {
  const token = crypto.randomBytes(TOKEN_BYTES).toString("hex");

  return {
    token,
    tokenHash: hashPasswordResetToken(token),
    expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
  };
};
