// ====== Navigation ======
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
hamburger?.addEventListener("click", () => navMenu.classList.toggle("active"));

// ====== Form Elements ======
const form = document.getElementById("yieldForm");
const result = document.getElementById("result");
const yieldValue = document.getElementById("yieldValue");
const recommend = document.getElementById("recommend");
const recommendValue = document.getElementById("recommendValue");

// 🧠 AI-style yield prediction (local simulation)
function predictYield(cropFactor, soilFactor, seasonFactor, temp, humidity, rain) {
  const base = (rain * soilFactor * cropFactor * seasonFactor + humidity * 0.8) / (temp * 0.25);
  const noise = Math.random() * 5; // adds small variation
  return (base + noise).toFixed(2);
}

// 🌿 Seasonal & soil recommendation system
function getRecommendations(season, soil) {
  const s = parseFloat(season);
  const soilType = parseFloat(soil);

  if (s === 1.1) return "🌾 Best for Wheat, Mustard, Gram, and Peas.";
  if (s === 1.2) return "☀️ Suitable for Cotton, Maize, and Millets.";
  if (s === 1.4) return "🌧 Ideal for Rice, Sugarcane, and Jute.";
  if (s === 1.0) return "🍅 Good for Vegetables, Oilseeds, and Fruits.";

  if (soilType > 1.3) return "🌱 Fertile soil — ideal for food grains.";
  if (soilType < 0.9) return "💧 Less fertile — focus on drought-resistant crops.";
  return "🌿 Balanced soil — good for mixed crops.";
}

// ====== Handle Prediction Form ======
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const cropFactor = parseFloat(document.getElementById("crop").value);
  const soilFactor = parseFloat(document.getElementById("soil").value);
  const seasonFactor = parseFloat(document.getElementById("season").value);
  const temp = parseFloat(document.getElementById("temp").value);
  const humidity = parseFloat(document.getElementById("humidity").value);
  const rain = parseFloat(document.getElementById("rain").value);

  // Show temporary processing message
  yieldValue.textContent = "Analyzing data with AI...";
  result.classList.remove("hidden");
  recommend.classList.remove("hidden");

  setTimeout(() => {
    const yieldResult = predictYield(cropFactor, soilFactor, seasonFactor, temp, humidity, rain);
    const confidence = (90 + Math.random() * 10).toFixed(1);
    const tip = temp > 35
      ? "🌞 Try irrigating early mornings to reduce heat stress."
      : "🌿 Conditions are favorable for healthy crop growth.";

    yieldValue.innerHTML = `
      <strong>Estimated Yield:</strong> ${yieldResult} quintals/acre<br>
      <strong>Confidence:</strong> ${confidence}%<br><br>
      <em>${tip}</em>`;

    recommendValue.textContent = getRecommendations(seasonFactor, soilFactor);
  }, 1200); // slightly faster AI simulation
});
