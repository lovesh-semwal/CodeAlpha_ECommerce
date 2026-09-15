const API_URL = "http://localhost:5000/api/products";

const productContainer = document.getElementById(
    "product-details-container"
);

let currentProduct = null;

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    try {
        if (!productId) {
            productContainer.innerHTML = `
                <p>Product not found.</p>
            `;
            return;
        }

        const response = await fetch(`${API_URL}/${productId}`);

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const product = await response.json();

        // Store product globally
        currentProduct = product;

        productContainer.innerHTML = `
            <div class="product-detail-card">

                <img 
                    src="${product.image}" 
                    alt="${product.name}"
                >

                <div class="product-detail-info">

                    <p class="category">
                        ${product.category}
                    </p>

                    <h2>${product.name}</h2>

                    <p class="description">
                        ${product.description}
                    </p>

                    <h3 class="detail-price">
                        ₹${product.price}
                    </h3>

                    <p>
                        Stock Available: ${product.stock}
                    </p>

                    <button 
                        class="product-btn"
                        onclick="addToCart()"
                    >
                        Add to Cart 🛒
                    </button>

                </div>

            </div>
        `;

    } catch (error) {
        console.error(error);

        productContainer.innerHTML = `
            <p>Unable to load product.</p>
        `;
    }
}


function addToCart() {

    if (!currentProduct) {
        alert("Product is not available.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        (item) => item.id === currentProduct._id
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: currentProduct._id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");

    window.location.href = "cart.html";
}


loadProduct();