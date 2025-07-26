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

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1", // Or another desired model
      messages: [{ role: "user", content: question }],
    });
    res.json({ text: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

router.get("/test", (req, res) => {
  res.json({ message: "Welcome to Dentie API" });
});

/**
 * 2️⃣ Daily Tip
 */
router.get("/dailytip", async (req, res) => {
  try {
    // Use today's tip if exists
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    let tip = await Tip.findOne({ date: { $gte: startOfDay, $lte: endOfDay } });

    if (!tip) {
      // Fallback: Random tip list
      const tips = [
        "Chewing parsley helps freshen your breath naturally.",
        "Oil pulling with coconut oil can improve gum health.",
        "Brushing your tongue can reduce bacteria.",
        "Rinse with warm salt water to soothe gum inflammation.",
        "Avoid sugary snacks between meals to protect your enamel.",
      ];

      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      tip = await Tip.create({ tip: randomTip });
    }

    res.json({ tip: tip.tip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tip" });
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
