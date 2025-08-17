const express = require("express");
const router = express.Router();
const axios = require("axios");
const { verifyToken } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.post("/send-tip", verifyToken, isAdmin, async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Flying Albatross", email: "support@heydentie.com" }, // must be verified in Brevo
        to: [{ email: to }],
        subject,
        htmlContent: `<p>${message}</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
    res.status(200).json({ message: "Tip sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
