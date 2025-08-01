const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Convert to plain object, remove password, rename _id to id
    const userObj = user.toObject();
    delete userObj.password;

    // Rename _id to id
    userObj.id = userObj._id;
    delete userObj._id;

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user: userObj,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
};

// POST /login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password." });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Convert user to object, remove password, rename _id to id
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id;
    delete userObj._id;

    res.json({
      message: "Login successfully.",
      token,
      user: userObj,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed." });
  }
};

// POST /login with google
const loginWithGoogle = async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: "Missing credential" });
  }

  try {
    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email || !name) {
      return res.status(400).json({ message: "Invalid Google data" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    // Create if doesn't exist
    if (!user) {
      user = await User.create({
        name,
        email,
        isGoogleAccount: true,
      });
    }

    // Sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Convert to plain object and remove password, rename _id to id
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id;
    delete userObj._id;

    res.json({
      message: "Google login successful",
      token,
      user: userObj,
    });
  } catch {
    return res.status(401).json({ message: "Google login failed" });
  }
};

// GET /refresh-token
const refreshToken = (req, res) => {
  try {
    const user = req.user; // From middleware

    // Generate new token
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Convert to plain object, remove password, rename _id to id
    const userObj = user.toObject();
    delete userObj.password;
    userObj.id = userObj._id;
    delete userObj._id;

    res.json({
      token: newToken,
      user: userObj,
    });
  } catch (err) {
    console.error("Token refresh failed:", err);
    res.status(500).json({ message: "Failed to refresh token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginWithGoogle,
  refreshToken,
};
