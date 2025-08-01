const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // adjust path
const { verifyToken } = require("../middleware/authMiddleware");
const { OAuth2Client } = require("google-auth-library");
const { registerUser, loginUser, loginWithGoogle, refreshToken } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", loginWithGoogle);
router.get("/verify-token", verifyToken, refreshToken);

module.exports = router;
