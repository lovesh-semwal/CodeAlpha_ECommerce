const API_URL = "http://localhost:5000/api/auth/login";

const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Login failed";
            return;
        }

        // Store JWT token
        localStorage.setItem("token", data.token);

        // Store user information if returned
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }

        message.textContent = "Login successful!";

        // Redirect to home
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);

    } catch (error) {
        console.error("Login error:", error);

        message.textContent = "Unable to connect to server.";
    }
});