import mongoose from "mongoose";
import dotenv from "dotenv";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);

    const existingKpi = await KPI.findOne();
    if (existingKpi) {
      console.log("Database already has data. Skipping seeding...");
      mongoose.connection.close();
      return;
    }

    console.log("Clearing old data...");
    await mongoose.connection.db.dropDatabase();

    console.log("Inserting mock data...");
    await KPI.insertMany(kpis);
    await Product.insertMany(products);
    await Transaction.insertMany(transactions);

    console.log("✅ Seeding complete! You can now start your backend.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
  }
};
seedDatabase();
