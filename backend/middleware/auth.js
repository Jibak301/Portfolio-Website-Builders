const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    // ✅ extract token
    const token = authHeader.split(" ")[1];

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 IMPORTANT: check user exists
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    // 🔥 IMPORTANT: block banned/suspended users
    if (user.status === "banned") {
      return res.status(403).json({ msg: "User is banned" });
    }

    if (user.status === "suspended") {
      return res.status(403).json({ msg: "User is suspended" });
    }

    // attach user
    req.user = user;

    // update last seen
    user.lastSeen = new Date();
    await user.save();

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};