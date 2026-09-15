const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with clear sound quality.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    stock: 20,
  },
  {
    name: "Smart Watch",
    description: "Smart watch with fitness tracking and notifications.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    stock: 15,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes designed for everyday comfort.",
    price: 1799,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Fashion",
    stock: 25,
  },
  {
    name: "Backpack",
    description: "Durable backpack suitable for college, work and travel.",
    price: 999,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    stock: 30,
  },
  {
    name: "Sunglasses",
    description: "Stylish sunglasses with a modern design.",
    price: 799,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories",
    stock: 18,
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear.",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Fashion",
    stock: 40,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products added successfully");

    process.exit();
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

seedProducts();