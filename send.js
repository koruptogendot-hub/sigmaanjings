import nodemailer from "nodemailer";

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
  { user: "gmail10@gmail.com", pass: "app_pass_10" },
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { number, gmailIndex } = req.body;
    const { user, pass } = gmailAccounts[gmailIndex];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    const to = "tujuanemail@gmail.com"; // ubah ke email target kamu
    const subject = "Notifikasi Nomor Baru";
    const text = `Nomor user: ${number}\nDikirim dari: ${user}`;

    const info = await transporter.sendMail({ from: user, to, subject, text });

    res.status(200).json({
      message: "Email terkirim!",
      messageId: info.messageId || null,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
}
