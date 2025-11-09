// 🌱 AgriSmart AI Authentication System

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
    const res = await fetch("http://localhost:5000/api/register", {
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
    const res = await fetch("http://localhost:5000/api/login", {
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


// ========== PROFILE ==========
if (window.location.pathname.endsWith("profile.html")) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
  } else {
    // Redirect to login if no user found
    window.location.href = "login.html";
  }

  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
  });
}


// ========== DASHBOARD PROTECTION ==========
if (window.location.pathname.endsWith("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("🔒 Please log in to access the Dashboard.");
    window.location.href = "login.html";
  }
}
