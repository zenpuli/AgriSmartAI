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

// ✅ Configure CORS
const allowedOrigins = ["https://zenpuli.github.io"];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allow cookies or auth headers
    allowedHeaders: ["Content-Type", "Authorization"], // allow JSON requests
  })
);

// Handle preflight requests globally
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
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
