// 🌱 AgriSmart AI Authentication System (Render Deployment)
const BASE_URL = "https://agrismartai-1.onrender.com"; // Render backend URL

// ========== REGISTER ==========
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!name || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Registration Successful! Please log in.");
      window.location.href = "login.html";
    } else {
      alert(`⚠️ ${data.message || "Registration failed."}`);
    }
  } catch (err) {
    alert("❌ Unable to connect to the server.");
    console.error(err);
  }
});

// ========== LOGIN ==========
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("✅ Login successful!");
      window.location.href = "profile.html";
    } else {
      alert(`⚠️ ${data.message || "Invalid credentials."}`);
    }
  } catch (err) {
    alert("❌ Unable to connect to the server.");
    console.error(err);
  }
});
