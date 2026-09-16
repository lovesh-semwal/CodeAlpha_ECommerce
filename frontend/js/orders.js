const ordersContainer = document.getElementById("orders-container");

const token = localStorage.getItem("token");

async function loadOrders() {
    if (!token) {
        ordersContainer.innerHTML = `
            <p>Please login to view your orders.</p>
            <a href="login.html" class="product-btn">
                Login
            </a>
        `;
        return;
    }

    try {
        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const orders = await response.json();

        if (!response.ok) {
            throw new Error(orders.message || "Failed to load orders");
        }

        if (orders.length === 0) {
            ordersContainer.innerHTML = `
                <div class="empty-orders">
                    <h3>No orders yet 📦</h3>
                    <a href="index.html" class="product-btn">
                        Start Shopping
                    </a>
                </div>
            `;
            return;
        }

        ordersContainer.innerHTML = "";

        orders.forEach((order) => {
            const orderCard = document.createElement("div");
            orderCard.className = "order-card";

            const orderDate = new Date(order.createdAt)
                .toLocaleDateString("en-IN");

            orderCard.innerHTML = `
                <div class="order-header">
                    <div>
                        <h3>Order #${order._id.slice(-6)}</h3>
                        <p>Date: ${orderDate}</p>
                    </div>

                    <span class="order-status">
                        ${order.status}
                    </span>
                </div>

                <div class="order-items">
                    ${order.items.map((item) => `
                        <div class="order-item">
                            <div>
                                <strong>${item.name}</strong>
                                <p>
                                    ₹${item.price} × ${item.quantity}
                                </p>
                            </div>

                            <strong>
                                ₹${item.price * item.quantity}
                            </strong>
                        </div>
                    `).join("")}
                </div>

                <div class="order-footer">
                    <p>
                        <strong>Shipping Address:</strong>
                        ${order.shippingAddress}
                    </p>

                    <h3>
                        Total: ₹${order.totalAmount}
                    </h3>
                </div>
            `;

            ordersContainer.appendChild(orderCard);
        });

    } catch (error) {
        console.error("Orders error:", error);

        ordersContainer.innerHTML = `
            <p>Unable to load orders.</p>
        `;
    }
}

loadOrders();