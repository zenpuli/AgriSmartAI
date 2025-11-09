import express from "express";
import Prediction from "../models/Prediction.js";

const router = express.Router();

// 📊 Store AI Predictions
router.post("/predict", async (req, res) => {
  try {
    const { cropFactor, soilFactor, seasonFactor, temp, humidity, rain, predictedYield, confidence, email } = req.body;

    const prediction = new Prediction({
      cropFactor,
      soilFactor,
      seasonFactor,
      temp,
      humidity,
      rain,
      predictedYield,
      confidence,
      email,
    });

    await prediction.save();
    res.status(200).json({ message: "✅ Prediction stored successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to store prediction data" });
  }
});

// 📋 Fetch Predictions (user-specific)
router.get("/predictions", async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { email } : {};
    const predictions = await Prediction.find(query).sort({ createdAt: -1 }).limit(10);
    res.json(predictions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to fetch predictions" });
  }
});

// 🗑 Delete All Predictions for a User
router.delete("/predictions", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email is required" });

    await Prediction.deleteMany({ email });
    res.json({ message: "🗑 All predictions deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Failed to delete predictions" });
  }
});


export default router;
