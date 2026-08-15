import nodemailer from "nodemailer";
import { env } from "../config/env";
import { AppError } from "../utils/AppError";

const hasSmtpAuth = Boolean(env.smtpUser && env.smtpPass);

const transporter = hasSmtpAuth
  ? nodemailer.createTransport(
      env.smtpHost
        ? {
            host: env.smtpHost,
            port: env.smtpPort,
            secure: env.smtpPort === 465,
            auth: {
              user: env.smtpUser,
              pass: env.smtpPass,
            },
          }
        : {
            service: "gmail",
            auth: {
              user: env.smtpUser,
              pass: env.smtpPass,
            },
          }
    )
  : null;

type SendVerificationEmailInput = {
  to: string;
  firstName: string;
  verifyUrl: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildVerificationEmailHtml = (firstName: string, verifyUrl: string) => {
  const safeName = escapeHtml(firstName);
  const safeUrl = escapeHtml(verifyUrl);

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your Admin Operations Platform account</title>
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
                  Verify your email
                </h1>
                <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#cbd5e1;">
                  Hi ${safeName},
                </p>
                <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#94a3b8;">
                  Please confirm this email address to finish creating your Admin Operations Platform account.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="border-radius:12px;background-color:#f8fafc;">
                      <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:1;color:#0f172a;text-decoration:none;">
                        Verify My Account
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:28px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#94a3b8;">
                  This link expires in <strong style="color:#e2e8f0;">15 minutes</strong> and can be used only once.
                </p>
                <p style="margin:16px 0 0;padding-top:16px;border-top:1px solid #334155;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#64748b;">
                  If you did not create this account, you can safely ignore this email. Never share this verification link with anyone.
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

export const sendVerificationEmail = async ({
  to,
  firstName,
  verifyUrl,
}: SendVerificationEmailInput) => {
  if (!transporter) {
    throw new AppError(
      "Email service is not configured. Set SMTP_USER and SMTP_PASS.",
      500
    );
  }

  const subject = "Verify your Admin Operations Platform account";
  const text = [
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
  ].join("\n");

  await transporter.sendMail({
    from: `Admin Operations Platform <${env.smtpUser}>`,
    to,
    subject,
    text,
    html: buildVerificationEmailHtml(firstName, verifyUrl),
  });
};
