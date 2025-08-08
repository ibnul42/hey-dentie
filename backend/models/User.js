const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional
    isGoogleAccount: { type: Boolean, default: false },
    isPremium: { type: Boolean, default: false },
    subscriptionType: {
      type: String,
      enum: ["free", "monthly", "yearly", "lifetime"],
      default: "free",
    },
    subscriptionEndDate: { type: Date, default: null },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    dailyAskCount: { type: Number, default: 0 },
    lastAskDate: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
