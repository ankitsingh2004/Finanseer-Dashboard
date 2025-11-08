// import mongoose from "mongoose";
// import { loadType } from "mongoose-currency";

// // Set up schema
// const Schema = mongoose.Schema;
// loadType(mongoose);

// const daySchema = new Schema(
//   {
//     date: String,
//     revenue: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },
//     expenses: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },
//   },

//   { toJSON: { getters: true } }
// );

// const monthSchema = new Schema(
//   {
//     month: String,
//     revenue: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },

//     expenses: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },

//     operationalExpenses: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },
//     nonOperationalExpenses: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },
//   },
//   { toJSON: { getters: true } }
// );

// const KPISchema = new Schema({
//   totalProfit: {
//     type: mongoose.Types.Currency,
//     currency: "USD",
//     get: (v) => v / 100,
//   },

//   totalRevenue: {
//     type: mongoose.Types.Currency,
//     currency: "USD",
//     get: (v) => v / 100,
//   },

//   totalExpenses: {
//     type: mongoose.Types.Currency,
//     currency: "USD",
//     get: (v) => v / 100,
//   },
//   expenseByCategory: {
//     // object that shows some string maybe like shoes clothes whatever and the value is going to be a currency tye so like 5322 Dollar
//     type: Map,
//     of: {
//       type: mongoose.Types.Currency,
//       currency: "USD",
//       get: (v) => v / 100,
//     },
//   },
//   monthlyData: [monthSchema],
//   dailyData: [daySchema],
// },
// {timestamps :true ,toJSON: {getters:true}} 
// );
// const KPI = mongoose.model("KPI", KPISchema);

// export default KPI;
 


import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }
);

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }
);

const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    // ✅ FIXED NAME: Must match frontend "expensesByCategory"
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }
);

const KPI = mongoose.model("KPI", KPISchema);
export default KPI;
