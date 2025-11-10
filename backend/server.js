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

// ✅ CORS Configuration: allow frontend GitHub Pages and optional local dev
const allowedOrigins = [
  "https://zenpuli.github.io",          // root GitHub Pages
  "https://zenpuli.github.io/AgriSmartAI" // repository subfolder
];

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin (like Postman or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy: Origin ${origin} not allowed`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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
