const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const Tracker = require("../models/Tracker");
const Tip = require("../models/Tip");
const QA = require("../models/QuestionAnswer");
const { verifyToken } = require("../middleware/authMiddleware");
const { dailyAskLimit } = require("../middleware/rateLimit");

// AI Configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * 1️⃣ Ask Dentie - AI Response
 */
router.post("/ask", verifyToken, dailyAskLimit, async (req, res) => {
  const { question } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!question || typeof question !== "string" || question.trim() === "") {
    return res.status(400).json({ error: "Invalid question input" });
  }

  try {
    // Step 1: Get AI answer (any topic)
    const answerResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Answer clearly and concisely.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const answer = answerResponse.choices[0]?.message?.content;

    // Step 2: Decode token and save Q&A if logged in
    let userId = null;
    if (token) {
      try {
        const decoded = require("jsonwebtoken").verify(
          token,
          process.env.JWT_SECRET
        );
        userId = decoded.id;
      } catch (e) {
        // token invalid or expired
      }
    }

    await QA.create({
      question,
      answer,
      user: userId,
    });

    res.json({ answer: answer || "Sorry, I couldn't find an answer." });
  } catch (error) {
    console.error("Error in /ask:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

/**
 * 2️⃣ Daily Tip
 */
router.get("/dailytip", async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    // 1. Check today's tip in DB
    let tipDoc = await Tip.findOne({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!tipDoc) {
      // 2. Get AI-generated tip
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You're a dental health coach who shares short, natural daily tips.",
          },
          {
            role: "user",
            content:
              "Give me one natural dental health tip. Keep it short and simple.",
          },
        ],
        temperature: 0.7,
      });

      const tipText = completion.choices[0]?.message?.content.trim();

      // 3. Save tip to DB
      tipDoc = await Tip.create({
        tip: tipText,
        date: new Date(),
      });
    }

    // 4. Return today's tip
    res.json({ tip: tipDoc.tip });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch daily tip" });
  }
});

/**
 * 3️⃣ Personal Dental Tracker
 */
router.post("/tracker", verifyToken, async (req, res) => {
  const { brushed, flossed, painLevel, bleeding, notes } = req.body;

  // Basic validation
  if (painLevel !== undefined && (painLevel < 0 || painLevel > 10)) {
    return res
      .status(400)
      .json({ error: "Pain level must be between 0 and 10." });
  }

  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Check if user already submitted today's tracker
    const existing = await Tracker.findOne({
      user: req.user._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Today's log already submitted." });
    }

    // Save new tracker log
    const tracker = await Tracker.create({
      user: req.user._id,
      brushed,
      flossed,
      painLevel,
      bleeding,
      notes,
    });

    res.status(201).json({
      message: "Tracker log saved successfully.",
      tracker,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save tracker log." });
  }
});

/**
 * 4️⃣ Get Tracker Logs for Logged-in User
 */
router.get("/tracker", verifyToken, async (req, res) => {
  try {
    const logs = await Tracker.find({ user: req.user._id })
      .sort({ date: -1 }) // newest first
      .select("-__v") // remove internal Mongo field
      .lean();

    res.json({ logs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tracker logs." });
  }
});

router.get("/tracker/streak", verifyToken, async (req, res) => {
  try {
    const logs = await Tracker.find({ user: req.user._id }).sort({ date: -1 });

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let log of logs) {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);

      if (logDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (logDate.getTime() === currentDate.getTime() - 86400000) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    res.json({ streak });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch streak" });
  }
});

// 5️⃣ Get Past Asked Questions & Answers
router.get("/ask-history", async (req, res) => {
  try {
    const history = await QA.find({}).sort({ date: -1 }).select("-__v").lean();

    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ask history." });
  }
});

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { priceId, userId, billingType } = req.body;
    const isLifetime = billingType === "lifetime";

    const session = await stripe.checkout.sessions.create({
      mode: isLifetime ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        userId,
        type: billingType, // "monthly" | "yearly" | "lifetime"
      },
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
