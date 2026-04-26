const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/portfolio");
async function createAdmin() {
  const hash = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hash,
    role: "admin",
  });

  console.log("Admin created ✅");
  process.exit();
}

createAdmin();
