import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";

dotenv.config();

async function clearSeedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Delete seeded products (Laptop, Smartphone, T-Shirt, Coffee Maker)
    const seededProductNames = ["Laptop", "Smartphone", "T-Shirt", "Coffee Maker"];
    const deleteResult = await Product.deleteMany({
      productName: { $in: seededProductNames }
    });
    console.log(`Deleted ${deleteResult.deletedCount} seeded products`);

    // Delete seeded categories (Electronics, Clothing, Home & Kitchen)
    const seededCategoryNames = ["Electronics", "Clothing", "Home & Kitchen"];
    const categoryResult = await Category.deleteMany({
      categoryName: { $in: seededCategoryNames }
    });
    console.log(`Deleted ${categoryResult.deletedCount} seeded categories`);

    console.log("Seed data cleared successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error clearing seed data:", error);
    mongoose.connection.close();
  }
}

clearSeedData();

