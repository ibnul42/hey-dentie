const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const Tracker = require("../models/Tracker");
const Tip = require("../models/Tip");

// AI Configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const client = new OpenAI();

/**
 * 1️⃣ Ask Dentie - AI Response
 */
router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== "string" || question.trim() === "") {
    return res.status(400).json({ error: "Invalid question input" });
  }

  // testing api
  return res.status(400).json({ answer: "dental health answer" });

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
    res.json({ answer: answer || "Sorry, I couldn't find an answer." });
  } catch (error) {
    console.error("OpenAI Error:", error);
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
    console.error("🧠 AI Daily Tip Error:", error);
    res.status(500).json({ error: "Failed to fetch daily tip" });
  }
});

/**
 * 3️⃣ Tracker
 */
router.post("/tracker", async (req, res) => {
  const { brushed, flossed, painLevel, bleeding, notes } = req.body;

  try {
    const newEntry = new Tracker({
      brushed,
      flossed,
      painLevel,
      bleeding,
      notes,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save tracker data" });
  }
});

module.exports = router;
