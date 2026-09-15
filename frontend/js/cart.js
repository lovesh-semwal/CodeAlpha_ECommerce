const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

function displayCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <a href="index.html" class="product-btn">
                    Continue Shopping
                </a>
            </div>
        `;

        cartTotal.innerHTML = "";

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button 
                    class="remove-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    cartTotal.innerHTML = `
        <div class="total-box">

            <h3>Total: ₹${total}</h3>

            <button 
                class="product-btn"
                onclick="checkout()"
            >
                Proceed to Checkout
            </button>

        </div>
    `;
}


function increaseQuantity(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function decreaseQuantity(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function removeFromCart(index) {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function checkout() {

    window.location.href = "checkout.html";
}


displayCart();