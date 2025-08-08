const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Payment = require("../models/Payment");
const { verifyToken } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// Get all users
router.get("/admin/users", verifyToken, isAdmin, async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

// Toggle user role between 'user' and 'admin'
router.put("/admin/user/:id/role", verifyToken, isAdmin, async (req, res) => {
  const targetUser = await User.findById(req.params.id);
  if (!targetUser) return res.status(404).json({ error: "User not found" });

  // Prevent self-demotion
  if (targetUser._id.toString() === req.user._id.toString()) {
    return res.status(403).json({ error: "You cannot change your own role" });
  }

  // Toggle role
  targetUser.role = targetUser.role === "admin" ? "user" : "admin";
  await targetUser.save();

  res.json({
    message: `User role updated to ${targetUser.role}`,
    role: targetUser.role,
  });
});

router.get("/admin/payments", verifyToken, isAdmin, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email") // Adjust as needed
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

module.exports = router;
