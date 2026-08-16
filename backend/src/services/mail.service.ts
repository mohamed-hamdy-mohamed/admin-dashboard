import { env } from "../config/env";
import { AppError } from "../utils/AppError";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const MAIL_TIMEOUT_MS = 10_000;
const DEFAULT_FROM = "Admin Operations Platform <onboarding@resend.dev>";

type ResendErrorBody = {
  message?: unknown;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const assertMailConfigured = () => {
  if (!env.resendApiKey) {
    throw new AppError(
      "Email service is not configured. Set RESEND_API_KEY.",
      500
    );
  }
};

const getMailFrom = () => env.emailFrom || DEFAULT_FROM;

const readResendErrorMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as ResendErrorBody;
    if (typeof body.message === "string" && body.message.trim()) {
      return body.message;
    }
  } catch {
    // Keep the generic failure message if the API body cannot be parsed.
  }

  return "Failed to send email. Please try again.";
};

const brandedEmailShell = ({
  title,
  heading,
  firstName,
  bodyHtml,
  footer,
}: {
  title: string;
  heading: string;
  firstName: string;
  bodyHtml: string;
  footer: string;
}) => {
  const safeTitle = escapeHtml(title);
  const safeHeading = escapeHtml(heading);
  const safeName = escapeHtml(firstName);
  const safeFooter = escapeHtml(footer);

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#131c2e;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#131c2e;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#1e293b;border:1px solid #334155;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#0f172a;padding:22px 32px;border-bottom:1px solid #334155;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#94a3b8;">
                  Admin Operations Platform
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 32px;">
                <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.3;font-weight:700;color:#f8fafc;">
                  ${safeHeading}
                </h1>
                <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#cbd5e1;">
                  Hi ${safeName},
                </p>
                ${bodyHtml}
                <p style="margin:16px 0 0;padding-top:16px;border-top:1px solid #334155;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#64748b;">
                  ${safeFooter}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
};

const actionButtonHtml = (label: string, url: string) => {
  const safeLabel = escapeHtml(label);
  const safeUrl = escapeHtml(url);

  return `
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:12px;background-color:#f8fafc;">
                      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:1;color:#0f172a;text-decoration:none;">
                        ${safeLabel}
                      </a>
                    </td>
                  </tr>
                </table>`;
};

const expiryNoteHtml = () => `
                <p style="margin:28px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#94a3b8;">
                  This link expires in <strong style="color:#e2e8f0;">15 minutes</strong> and can be used only once.
                </p>`;

const bodyParagraphHtml = (text: string) => `
                <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#94a3b8;">
                  ${escapeHtml(text)}
                </p>`;

const buildVerificationEmailHtml = (firstName: string, verifyUrl: string) =>
  brandedEmailShell({
    title: "Verify your Admin Operations Platform account",
    heading: "Verify your email",
    firstName,
    bodyHtml: `${bodyParagraphHtml(
      "Please confirm this email address to finish creating your Admin Operations Platform account."
    )}${actionButtonHtml("Verify My Account", verifyUrl)}${expiryNoteHtml()}`,
    footer:
      "If you did not create this account, you can safely ignore this email. Never share this verification link with anyone.",
  });

const buildPasswordResetEmailHtml = (firstName: string, resetUrl: string) =>
  brandedEmailShell({
    title: "Reset your Admin Operations Platform password",
    heading: "Reset your password",
    firstName,
    bodyHtml: `${bodyParagraphHtml(
      "Use the one-time link below to choose a new password for your Admin Operations Platform account."
    )}${actionButtonHtml("Reset Password", resetUrl)}${expiryNoteHtml()}`,
    footer:
      "If you did not request a password reset, you can safely ignore this email. Never share this link with anyone.",
  });

const buildPasswordChangedEmailHtml = (firstName: string) =>
  brandedEmailShell({
    title: "Your Admin Operations Platform password was changed",
    heading: "Password updated",
    firstName,
    bodyHtml: bodyParagraphHtml(
      "Your Admin Operations Platform password was changed successfully. If you made this change, no further action is needed."
    ),
    footer:
      "If you did not change your password, reset it immediately and contact support.",
  });

const sendMail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) => {
  assertMailConfigured();

  let response: Response;

  try {
    response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: getMailFrom(),
        to,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(MAIL_TIMEOUT_MS),
    });
  } catch (err) {
    if (err instanceof Error && err.name === "TimeoutError") {
      throw new AppError("Failed to send email. The request timed out.", 500);
    }

    throw new AppError("Failed to send email. Please try again.", 500);
  }

  if (!response.ok) {
    throw new AppError(await readResendErrorMessage(response), 500);
  }
};

type SendVerificationEmailInput = {
  to: string;
  firstName: string;
  verifyUrl: string;
};

export const sendVerificationEmail = async ({
  to,
  firstName,
  verifyUrl,
}: SendVerificationEmailInput) => {
  await sendMail({
    to,
    subject: "Verify your Admin Operations Platform account",
    html: buildVerificationEmailHtml(firstName, verifyUrl),
    text: [
      `Hi ${firstName},`,
      "",
      "Please confirm this email address to finish creating your Admin Operations Platform account.",
      "",
      "Verify My Account:",
      verifyUrl,
      "",
      "This link expires in 15 minutes and can be used only once.",
      "",
      "If you did not create this account, you can safely ignore this email. Never share this verification link with anyone.",
    ].join("\n"),
  });
};

type SendPasswordResetEmailInput = {
  to: string;
  firstName: string;
  resetUrl: string;
};

export const sendPasswordResetEmail = async ({
  to,
  firstName,
  resetUrl,
}: SendPasswordResetEmailInput) => {
  await sendMail({
    to,
    subject: "Reset your Admin Operations Platform password",
    html: buildPasswordResetEmailHtml(firstName, resetUrl),
    text: [
      `Hi ${firstName},`,
      "",
      "Use the one-time link below to choose a new password for your Admin Operations Platform account.",
      "",
      "Reset Password:",
      resetUrl,
      "",
      "This link expires in 15 minutes and can be used only once.",
      "",
      "If you did not request a password reset, you can safely ignore this email. Never share this link with anyone.",
    ].join("\n"),
  });
};

type SendPasswordChangedEmailInput = {
  to: string;
  firstName: string;
};

export const sendPasswordChangedEmail = async ({
  to,
  firstName,
}: SendPasswordChangedEmailInput) => {
  await sendMail({
    to,
    subject: "Your Admin Operations Platform password was changed",
    html: buildPasswordChangedEmailHtml(firstName),
    text: [
      `Hi ${firstName},`,
      "",
      "Your Admin Operations Platform password was changed successfully. If you made this change, no further action is needed.",
      "",
      "If you did not change your password, reset it immediately and contact support.",
    ].join("\n"),
  });
};
