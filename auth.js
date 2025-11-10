// 🌱 AgriSmart AI Authentication System
const BASE_URL = "https://agrismartai-1.onrender.com"; // Your backend URL

// ===== REGISTER =====
const registerForm = document.getElementById("registerForm");
registerForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("⚠️ Please fill in all fields!");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
      credentials: "include" // needed if backend uses cookies
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Registration successful! Please login.");
      window.location.href = "login.html";
    } else {
      alert(`⚠️ ${data.message || "Registration failed."}`);
    }
  } catch (err) {
    console.error("Register Error:", err);
    alert("❌ Unable to connect to server. Check your network or CORS settings.");
  }
});

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("⚠️ Please enter both email and password!");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Login successful!");
      window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
      alert(`⚠️ ${data.message || "Invalid credentials."}`);
    }
  } catch (err) {
    console.error("Login Error:", err);
    alert("❌ Unable to connect to server. Check your network or CORS settings.");
  }
});
