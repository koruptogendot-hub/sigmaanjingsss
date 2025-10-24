import nodemailer from "nodemailer";

/*
 * WARNING:
 * - This file contains hard-coded credentials.
 * - Do NOT push real credentials to a public repo.
 * - Prefer using App Passwords and private repo or environment variables.
 */

const gmailAccounts = [
  { user: "gmail1@gmail.com", pass: "app_pass_1" },
  { user: "gmail2@gmail.com", pass: "app_pass_2" },
  { user: "gmail3@gmail.com", pass: "app_pass_3" },
  { user: "gmail4@gmail.com", pass: "app_pass_4" },
  { user: "gmail5@gmail.com", pass: "app_pass_5" },
  { user: "gmail6@gmail.com", pass: "app_pass_6" },
  { user: "gmail7@gmail.com", pass: "app_pass_7" },
  { user: "gmail8@gmail.com", pass: "app_pass_8" },
  { user: "gmail9@gmail.com", pass: "app_pass_9" },
  { user: "gmail10@gmail.com", pass: "app_pass_10" }
];

// Default recipient — ganti sesuai kebutuhan
const TO_EMAIL_TARGET = "tujuanemail@gmail.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const body = req.body || {};
    // frontend mengirimkan: { number, gmailIndex } 
    const number = String(body.number || "").trim();
    const gmailIndex = Number.isFinite(Number(body.gmailIndex)) ? Number(body.gmailIndex) : 0;

    if (!number) {
      return res.status(400).json({ error: "Missing 'number' in request body" });
    }
    if (isNaN(gmailIndex) || gmailIndex < 0 || gmailIndex >= gmailAccounts.length) {
      return res.status(400).json({ error: "Invalid gmailIndex" });
    }

    const { user, pass } = gmailAccounts[gmailIndex];

    // create transporter using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass }
    });

    const subject = "Notifikasi Nomor Baru";
    const text = `Nomor user: ${number}\nDikirim dari: ${user}`;

    const info = await transporter.sendMail({
      from: `"Notifikasi" <${user}>`,
      to: TO_EMAIL_TARGET,
      subject,
      text
    });

    const time = new Date().toLocaleString();

    return res.status(200).json({
      success: true,
      to: TO_EMAIL_TARGET,
      from: user,
      subject,
      text,
      time,
      messageId: info.messageId || info.response || null,
      info: typeof info === "object" ? { response: info.response } : info
    });
  } catch (err) {
    console.error("Send error:", err);
    const safeMessage = err && err.message ? err.message : "Unknown error";
    return res.status(500).json({
      success: false,
      error: safeMessage
    });
  }
}
