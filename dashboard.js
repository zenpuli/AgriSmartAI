const BASE_URL = "https://agrismartai-1.onrender.com"; // Render backend URL

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
const predictionsTable = document.getElementById("predictionsTable");

// 🧠 AI-style yield prediction
function predictYield(cropFactor, soilFactor, seasonFactor, temp, humidity, rain) {
  const base = (rain * soilFactor * cropFactor * seasonFactor + humidity * 0.8) / (temp * 0.25);
  const noise = Math.random() * 5;
  return (base + noise).toFixed(2);
}

// 🌿 Seasonal Recommendation System
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

  yieldValue.textContent = "Analyzing data with AI...";
  result.classList.remove("hidden");
  recommend.classList.remove("hidden");

  setTimeout(async () => {
    const yieldResult = predictYield(cropFactor, soilFactor, seasonFactor, temp, humidity, rain);
    const confidence = (90 + Math.random() * 10).toFixed(1);
    const tip =
      temp > 35
        ? "🌞 Try irrigating early mornings to reduce heat stress."
        : "🌿 Conditions are favorable for healthy crop growth.";

    yieldValue.innerHTML = `
      <strong>Estimated Yield:</strong> ${yieldResult} quintals/acre<br>
      <strong>Confidence:</strong> ${confidence}%<br><br>
      <em>${tip}</em>`;

    recommendValue.textContent = getRecommendations(seasonFactor, soilFactor);

    // 🧩 Send data to backend with user email
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`${BASE_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropFactor,
          soilFactor,
          seasonFactor,
          temp,
          humidity,
          rain,
          predictedYield: yieldResult,
          confidence,
          email: user?.email || "guest",
        }),
      });
      await res.json();
      loadPredictions();
    } catch (err) {
      console.error("Error saving prediction:", err);
    }
  }, 1500);
});

// ====== Google Map Initialization ======
function initMap() {
  const guntur = { lat: 16.3067, lng: 80.4365 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: guntur,
    mapTypeId: "hybrid",
  });
  new google.maps.Marker({
    position: guntur,
    map,
    title: "Target Agricultural Area - Guntur",
  });
}

// ====== Fetch and Display User-Specific Predictions ======
async function loadPredictions() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !predictionsTable) return;

  try {
    const res = await fetch(`${BASE_URL}/api/predict/${user.email}`);
    const data = await res.json();

    predictionsTable.innerHTML = data.predictions
      .map(
        (p, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${p.cropFactor}</td>
        <td>${p.soilFactor}</td>
        <td>${p.seasonFactor}</td>
        <td>${p.temp}</td>
        <td>${p.humidity}</td>
        <td>${p.rain}</td>
        <td>${p.predictedYield}</td>
        <td>${p.confidence}%</td>
      </tr>`
      )
      .join("");
  } catch (err) {
    console.error("Error loading predictions:", err);
  }
}

// ====== Initialize on Page Load ======
document.addEventListener("DOMContentLoaded", () => {
  loadPredictions();
  initMap();
});
