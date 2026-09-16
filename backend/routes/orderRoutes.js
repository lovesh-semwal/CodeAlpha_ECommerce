const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// Create Order
router.post("/", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {
            items,
            totalAmount,
            shippingAddress
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }

        const order = await Order.create({
            userId: decoded.userId,
            items,
            totalAmount,
            shippingAddress
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("ORDER ERROR:", error);

        res.status(500).json({
            message: "Failed to place order"
        });
    }
});


// Get logged-in user's orders
router.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const orders = await Order.find({
            userId: decoded.userId
        }).sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        console.error("GET ORDERS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
});


module.exports = router;