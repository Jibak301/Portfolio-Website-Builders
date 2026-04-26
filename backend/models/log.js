const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
