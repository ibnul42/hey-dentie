const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema(
  {
    tip: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tip", tipSchema);
