// 🌱 AgriSmart AI Backend Server
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

// ✅ Proper CORS Configuration
const allowedOrigins = ["https://zenpuli.github.io"]; // Frontend URL
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow preflight
    allowedHeaders: ["Content-Type", "Authorization"], // required headers
    credentials: true, // only needed if sending cookies or auth headers
  })
);

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api", predictRoutes);
app.use("/api", contactRoutes);

// 🏠 Default Route (Test Server)
app.get("/", (req, res) => {
  res.send("🌿 AgriSmart AI Backend is running successfully!");
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
