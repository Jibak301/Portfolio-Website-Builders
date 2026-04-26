const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    name: String,
    bio: String,
    github: String,

    skills: [String],

    internships: [{ company: String, role: String }],

    projects: [{ title: String, image: String }],

    // template
    template: {
      type: String,
      default: "template1",
    },

    // ✅ FIXED (moved inside schema)
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Portfolio", schema);
