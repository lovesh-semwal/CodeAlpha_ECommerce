function updateNavbar() {
    const navLinks = document.querySelector(".nav-links");

    if (!navLinks) {
        return;
    }

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="cart.html">Cart 🛒</a>
            <a href="orders.html">My Orders</a>
            <span class="welcome-user">
                Hi, ${user.name}
            </span>
            <a href="#" onclick="logout()">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="index.html">Home</a>
            <a href="cart.html">Cart 🛒</a>
            <a href="login.html">Login</a>
        `;
    }
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "index.html";
}

updateNavbar();