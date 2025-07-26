const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },

    brushed: { type: Boolean, default: false },
    flossed: { type: Boolean, default: false },
    painLevel: { type: Number, min: 0, max: 10 },
    bleeding: { type: Boolean, default: false },
    notes: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tracker", trackerSchema);
