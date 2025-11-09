import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 💬 Save Contact Form Data
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ message: "⚠️ All fields are required!" });

    await Contact.create({ name, email, message });
    res.status(200).json({ message: "✅ Message received successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to send message" });
  }
});

export default router;
