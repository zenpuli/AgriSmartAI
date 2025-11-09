import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  cropFactor: Number,
  soilFactor: Number,
  seasonFactor: Number,
  temp: Number,
  humidity: Number,
  rain: Number,
  predictedYield: String,
  confidence: Number,
  createdAt: { type: Date, default: Date.now },
});

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
