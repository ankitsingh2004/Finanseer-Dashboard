/**
 * 🚀 index.js — Main Backend Server for Finanseer Dashboard
 */

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/Product.js";
import transactionRoutes from "./routes/transaction.js";

dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Health Check Route
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: Arial; text-align: center; margin-top: 50px;">
      <h1>✅ Finanseer Backend Running</h1>
      <p>Server and MongoDB are connected successfully!</p>
    </div>
  `);
});

// API Routes
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

// Server and MongoDB Setup
const PORT = process.env.PORT || 1337;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`✅ Server is running at http://localhost:${PORT}`)
    );
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
  });





















// // =======================
// // IMPORTS
// // =======================
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";

// // Import routes
// import kpiRoutes from "./routes/kpi.js";
// import productRoutes from "./routes/Product.js";
// import transactionRoutes from "./routes/transaction.js";

// // Import models and mock data (optional for one-time DB setup)
// import KPI from "./models/KPI.js";
// import Product from "./models/Product.js";
// import Transaction from "./models/Transaction.js";
// import { kpis, products, transactions } from "./data/data.js";

// // =======================
// // CONFIGURATION
// // =======================
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// // =======================
// // TEST ROUTE
// // =======================
// app.get("/", (req, res) => {
//   res.send(`
//     <div style="font-family: Arial; text-align: center; margin-top: 50px;">
//       <h1>🚀 Backend Server is Running Successfully!</h1>
//       <p>Your Express + MongoDB setup is working fine.</p>
//     </div>
//   `);
// });

// // =======================
// // ROUTES
// // =======================
// app.use("/kpi", kpiRoutes);
// app.use("/product", productRoutes);
// app.use("/transaction", transactionRoutes);
// // =======================
// // MONGOOSE SETUP
// // =======================
// const PORT = process.env.PORT || 1337;

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(async () => {
//     app.listen(PORT, () =>
//       console.log(`✅ Server running on port: ${PORT}`)
//     );

//     // OPTIONAL: Insert initial data (ONLY RUN ONCE)
//     // await mongoose.connection.db.dropDatabase();
//     // await KPI.insertMany(kpis);
//     // await Product.insertMany(products);
//     // await Transaction.insertMany(transactions);
//     console.log("✅ MongoDB connected successfully");
//   })
//   .catch((error) => console.error("❌ MongoDB connection failed:", error));
