const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const Log = require("../models/Log");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* ===== USERS ===== */
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== STATS ===== */
router.get("/stats", auth, admin, async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "active" });
    const banned = await User.countDocuments({ status: "banned" });
    const suspended = await User.countDocuments({ status: "suspended" });

    res.json({ total, active, banned, suspended });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== ANALYTICS ===== */
router.get("/analytics", auth, admin, async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== UPDATE USER STATUS ===== */
router.put("/user/:id/status", auth, admin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "suspended", "banned"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    await Log.create({
      user: req.user.id,
      action: `${status.toUpperCase()} user ${req.params.id}`,
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== DELETE USER ===== */
router.delete("/user/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    await Log.create({
      user: req.user.id,
      action: `Deleted user ${req.params.id}`,
    });

    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== VIEW USER PORTFOLIO ===== */
router.get("/portfolio/:id", auth, admin, async (req, res) => {
  try {
    const data = await Portfolio.findOne({ user: req.params.id });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== UPDATE USER PORTFOLIO (ADMIN EDIT) ===== */
router.put("/portfolio/:id", auth, admin, async (req, res) => {
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { user: req.params.id },
      req.body,
      {
        new: true,
        upsert: true,
      }
    );

    await Log.create({
      user: req.user.id,
      action: `Edited portfolio of user ${req.params.id}`,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== LOGS ===== */
router.get("/logs", auth, admin, async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;