const checkoutItems = document.getElementById("checkout-items");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutForm = document.getElementById("checkout-form");
const checkoutMessage = document.getElementById("checkout-message");

const cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display cart items
function displayCheckout() {
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
            <a href="index.html" class="product-btn">
                Continue Shopping
            </a>
        `;

        checkoutForm.style.display = "none";
        checkoutTotal.innerHTML = "";

        return;
    }

    let total = 0;

    checkoutItems.innerHTML = "";

    cart.forEach((product) => {
        total += product.price * product.quantity;

        checkoutItems.innerHTML += `
            <div class="checkout-item">
                <div>
                    <h3>${product.name}</h3>
                    <p>₹${product.price} × ${product.quantity}</p>
                </div>

                <strong>
                    ₹${product.price * product.quantity}
                </strong>
            </div>
        `;
    });

    checkoutTotal.innerHTML = `
        <div class="checkout-total-box">
            <h3>Total Amount: ₹${total}</h3>
        </div>
    `;
}


// Place order
checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        checkoutMessage.textContent =
            "Please login before placing an order.";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

        return;
    }

    const shippingAddress =
        document.getElementById("shipping-address").value.trim();

    if (!shippingAddress) {
        checkoutMessage.textContent =
            "Please enter your shipping address.";

        return;
    }

    let totalAmount = 0;

    cart.forEach((product) => {
        totalAmount += product.price * product.quantity;
    });


    const orderItems = cart.map((product) => ({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
    }));


    try {
        checkoutMessage.textContent = "Placing order...";

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    items: orderItems,
                    totalAmount,
                    shippingAddress
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {
            checkoutMessage.textContent =
                data.message || "Failed to place order.";

            return;
        }


        // Clear cart after successful order
        localStorage.removeItem("cart");

        checkoutMessage.textContent =
            "Order placed successfully! 🎉";


        setTimeout(() => {
            window.location.href = "orders.html";
        }, 1500);


    } catch (error) {

        console.error("Checkout error:", error);

        checkoutMessage.textContent =
            "Unable to connect to server.";
    }
});


displayCheckout();