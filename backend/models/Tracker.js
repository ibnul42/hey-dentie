const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  brushed: Boolean,
  flossed: Boolean,
  painLevel: Number,
  bleeding: Boolean,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tracker", trackerSchema);
