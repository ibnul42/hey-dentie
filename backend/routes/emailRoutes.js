const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { verifyToken } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// POST /api/send-tip
router.post("/send-tip", verifyToken, isAdmin, async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Use Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Hey Dentie" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Tip sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
