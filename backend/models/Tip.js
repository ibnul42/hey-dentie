const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  tip: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tip", tipSchema);
