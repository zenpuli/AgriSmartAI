import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ CORS configuration for GitHub Pages frontend
const allowedOrigins = [
  "https://zenpuli.github.io",
  "https://zenpuli.github.io/AgriSmartAI"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests from Postman or curl (no origin)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error("CORS policy does not allow access from this origin"), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Connect to DB
connectDB();

// Routes
app.use("/api", userRoutes);
app.use("/api", predictRoutes);
app.use("/api", contactRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🌿 AgriSmart AI Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
