import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Proper CORS configuration


// MongoDB
connectDB();

// Routes
import userRoutes from "./routes/userRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

app.use("/api", userRoutes);
app.use("/api", predictRoutes);
app.use("/api", contactRoutes);const allowedOrigins = ["https://zenpuli.github.io", "https://zenpuli.github.io/AgriSmartAI"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.get("/", (req, res) => res.send("🌿 AgriSmart AI Backend is running successfully!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
