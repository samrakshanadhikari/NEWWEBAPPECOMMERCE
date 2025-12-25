import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import User from "./models/userModel.js";

dotenv.config();

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Get the admin user to associate products with
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.error("Admin user not found. Run createUsers.js first.");
      process.exit(1);
    }

    // Clear existing data (optional)
    // await Product.deleteMany({});
    // await Category.deleteMany({});

    // Sample Categories
    const categories = [
      { categoryName: "Electronics" },
      { categoryName: "Clothing" },
      { categoryName: "Home & Kitchen" }
    ];

    const createdCategories = await Category.insertMany(categories);
    console.log("Categories seeded!");

    // Sample Products
    const products = [
      {
        productName: "Laptop",
        productDescription: "High-performance laptop for work and play",
        productPrice: 999.99,
        productTotalStockQuantity: 50,
        category: createdCategories[0].categoryName,
        userId: admin._id,
        totalRating: 4.5
      },
      {
        productName: "Smartphone",
        productDescription: "Latest smartphone with advanced camera features",
        productPrice: 699.99,
        productTotalStockQuantity: 100,
        category: createdCategories[0].categoryName,
        userId: admin._id,
        totalRating: 4.8
      },
      {
        productName: "T-Shirt",
        productDescription: "Comfortable cotton t-shirt in various colors",
        productPrice: 19.99,
        productTotalStockQuantity: 200,
        category: createdCategories[1].categoryName,
        userId: admin._id,
        totalRating: 4.2
      },
      {
        productName: "Coffee Maker",
        productDescription: "Easy-to-use coffee maker for your morning brew",
        productPrice: 49.99,
        productTotalStockQuantity: 30,
        category: createdCategories[2].categoryName,
        userId: admin._id,
        totalRating: 4.0
      }
    ];

    await Product.insertMany(products);
    console.log("Products seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding products:", error);
    mongoose.connection.close();
  }
}

seedProducts();