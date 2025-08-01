const User = require("../models/User");

const dailyAskLimit = async (req, res, next) => {
  try {
    const user = req.user;

    // Skip if premium (optional)
    if (user.isPremium) return next();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Midnight today

    const lastAsk = user.lastAskDate ? new Date(user.lastAskDate) : null;

    // Reset if it's a new day
    if (!lastAsk || lastAsk < today) {
      user.dailyAskCount = 0;
      user.lastAskDate = today;
    }

    if (user.dailyAskCount >= 2) {
      return res.status(429).json({
        message: "Free user limit reached. Please upgrade to continue.",
      });
    }

    user.dailyAskCount += 1;
    await user.save();

    next();
  } catch (err) {
    console.error("Rate limit middleware error:", err);
    return res.status(500).json({ message: "Rate limit check failed" });
  }
};

module.exports = { dailyAskLimit };
