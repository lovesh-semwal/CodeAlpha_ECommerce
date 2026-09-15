const API_URL = "http://localhost:5000/api/products";

const productsContainer = document.getElementById("products-container");

async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        const products = await response.json();

        productsContainer.innerHTML = "";

        products.forEach((product) => {
            const productCard = document.createElement("div");

            productCard.className = "product-card";

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <h3>${product.name}</h3>

                    <p>${product.category}</p>

                    <div class="product-price">
                        ₹${product.price}
                    </div>

                    <a 
                        href="product.html?id=${product._id}" 
                        class="product-btn"
                    >
                        View Details
                    </a>
                </div>
            `;

            productsContainer.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error loading products:", error);

        productsContainer.innerHTML = `
            <p>Unable to load products.</p>
        `;
    }
}

loadProducts();