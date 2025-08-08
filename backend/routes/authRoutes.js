const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path
const { verifyToken } = require("../middleware/authMiddleware");
const { OAuth2Client } = require("google-auth-library");
const {
  registerUser,
  loginUser,
  loginWithGoogle,
  refreshToken,
} = require("../controllers/authController");
const isAdmin = require("../middleware/isAdmin");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", loginWithGoogle);
router.get("/verify-token", verifyToken, refreshToken);

router.post(
  "/admin/send-tip/:userId",
  verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { sendDailyTipEmail } = require("../jobs/dailyTipJob");

      const tips = [
        "Brush your teeth for at least 2 minutes.",
        "Floss at least once a day.",
        "Visit your dentist every 6 months.",
      ];
      const tip = tips[new Date().getDate() % tips.length];

      await sendDailyTipEmail(user.email, user.name, tip);
      res.json({ message: "Daily tip sent" });
    } catch (error) {
      console.error("Send tip error:", error.message);
      res.status(500).json({ error: "Failed to send tip" });
    }
  }
);

module.exports = router;
