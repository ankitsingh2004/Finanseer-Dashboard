// import express from "express";
// import KPI from "../models/KPI.js";

// const router = express.Router();

// router.get("/kpis", async (req, res) => {
//   try {
//     const kpis = await KPI.find();
//     res.status(200).json(kpis);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// export default router;




import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    res.status(500).json({ message: "Failed to fetch KPI data" });
  }
});

export default router;
