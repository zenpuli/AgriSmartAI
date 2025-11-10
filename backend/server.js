// 🌱 AgriSmart AI Backend Server (Production Ready)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

// 🔧 Initialize App
dotenv.config();
const app = express();

// 🧩 Middleware
app.use(express.json());

// ✅ Configure CORS (allow frontend URL in production)
app.use(cors({
  origin: [
    "https://zenpuli.github.io",
    "https://zenpuli.github.io/AgriSmartAI", // add this
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    process.env.FRONTEND_URL
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));


// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", predictRoutes);
app.use("/api", contactRoutes);

// 🏠 Default Route (for testing)
app.get("/", (req, res) => {
  res.send("🌿 AgriSmart AI Backend is running successfully!");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
