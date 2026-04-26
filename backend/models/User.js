const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // BASIC INFO
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ROLE (user / admin)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🔥 STATUS SYSTEM (IMPORTANT)
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },

    // LAST ACTIVE TIME
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// REMOVE PASSWORD FROM JSON RESPONSE (SECURITY)
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);