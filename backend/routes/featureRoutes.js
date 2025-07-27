const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const Tracker = require("../models/Tracker");
const Tip = require("../models/Tip");
const QA = require("../models/QuestionAnswer");
const { verifyToken } = require("../middleware/authMiddleware");

// AI Configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new OpenAI();

/**
 * 1️⃣ Ask Dentie - AI Response
 */
router.post("/ask", async (req, res) => {
  const { question } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!question || typeof question !== "string" || question.trim() === "") {
    return res.status(400).json({ error: "Invalid question input" });
  }

  // testing api
  // return res.status(400).json({ answer: "dental health answer" });

  try {
    // Step 1: Use to check if it's dental related
    const filterCheck = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You're a dental filter bot. Reply ONLY with 'yes' if the question is about dental health. If not, reply 'no'. No explanation.",
        },
        { role: "user", content: question },
      ],
      temperature: 0,
    });

    const responseText = filterCheck.choices[0]?.message?.content
      .toLowerCase()
      .trim();

    if (!responseText.startsWith("yes")) {
      return res.json({
        answer: "🦷 Please ask a question related to dental health.",
      });
    }

    // Step 2: Use for actual answer
    const answerResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI dental assistant.",
        },
        { role: "user", content: question },
      ],
      temperature: 0.7,
    });

    const answer = answerResponse.choices[0]?.message?.content;

    // ✅ Step 3: Save question + answer to DB
    let userId = null;
    if (token) {
      try {
        const decoded = require("jsonwebtoken").verify(
          token,
          process.env.JWT_SECRET
        );
        userId = decoded.id;
      } catch (e) {}
    }

    await QA.create({
      question,
      answer,
      user: userId,
    });

    res.json({ answer: answer || "Sorry, I couldn't find an answer." });
  } catch (error) {
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

module.exports = router;
