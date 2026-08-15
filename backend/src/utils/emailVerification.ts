import crypto from "crypto";

const TOKEN_BYTES = 32;
export const EMAIL_VERIFICATION_TTL_MS = 15 * 60 * 1000;

export const createEmailVerificationToken = () => {
  const token = crypto.randomBytes(TOKEN_BYTES).toString("hex");

  return {
    token,
    tokenHash: hashEmailVerificationToken(token),
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
  };
};

export const hashEmailVerificationToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");
