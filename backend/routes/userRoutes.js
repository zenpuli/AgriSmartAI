import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// 🧩 Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "⚠️ User already exists!" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(200).json({ message: "✅ Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error during registration" });
  }
});

// 🔐 Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "⚠️ User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "⚠️ Invalid password!" });

    res.status(200).json({
      message: "✅ Login successful!",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error during login" });
  }
});

export default router;
