const express = require("express");
const router = express.Router();

const Portfolio = require("../models/Portfolio");
const auth = require("../middleware/auth");

/* ===== SAVE / UPDATE PORTFOLIO ===== */
router.post("/", auth, async (req, res) => {
  try {
    const data = await Portfolio.findOneAndUpdate(
      { user: req.user.id },
      { ...req.body, user: req.user.id },
      { new: true, upsert: true }
    );

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving portfolio" });
  }
});

/* ===== GET MY PORTFOLIO ===== */
router.get("/me", auth, async (req, res) => {
  try {
    const data = await Portfolio.findOne({ user: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== PUBLIC PORTFOLIO (VERY IMPORTANT) ===== */
router.get("/public/:id", async (req, res) => {
  try {
    const data = await Portfolio.findOne({
      user: req.params.id,
      isPublished: true,
    });

    if (!data) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===== PUBLISH TOGGLE ===== */
router.put("/publish", auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      return res.status(404).json({ msg: "Portfolio not found" });
    }

    portfolio.isPublished = !portfolio.isPublished;
    await portfolio.save();

    res.json({ isPublished: portfolio.isPublished });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;