import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

// Define types
interface ExpenseData {
  name: string;
  value: number;
}

interface Product {
  _id: string;
  expense: number;
  price: number;
}

interface Transaction {
  _id: string;
  buyer: string;
  amount: number;
  productIds: string[];
}

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData, isLoading: kpiLoading, error: kpiError } = useGetKpisQuery();
  const { data: productData, isLoading: productLoading, error: productError } = useGetProductsQuery();
  const { data: transactionData, isLoading: transactionLoading, error: transactionError } = useGetTransactionsQuery();

  // ✅ Fixed pieChartData - simplified structure
  const pieChartData = useMemo((): ExpenseData[][] => {
    if (!kpiData || !kpiData[0] || !kpiData[0].expensesByCategory) return [];

    const expensesByCategory = kpiData[0].expensesByCategory;
    
    return Object.entries(expensesByCategory).map(([category, value]) => {
      const categoryValue = typeof value === 'number' ? value : 0;
      const otherValue = Math.max(0, (kpiData[0].totalExpenses || 0) - categoryValue);
      
      return [
        { name: category, value: categoryValue },
        { name: 'Other', value: otherValue },
      ];
    });
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {String(params.value).substring(0, 8)}...
        </Typography>
      ),
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      renderCell: (params: GridCellParams) => (
        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
          {String(params.value).substring(0, 8)}...
        </Typography>
      ),
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.2,
      renderCell: (params: GridCellParams) =>
        Array.isArray(params.value) ? params.value.length : 0,
    },
  ];

  // Enhanced loading state
  if (kpiLoading || productLoading || transactionLoading) {
    return (
      <Box sx={{ gridArea: "g / i / j / j", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: palette.grey[300] }}>
          Loading data, please wait...
        </Typography>
      </Box>
    );
  }

  // Enhanced error state
  if (kpiError || productError || transactionError) {
    console.error("Error loading data:", { kpiError, productError, transactionError });
    return (
      <Box sx={{ gridArea: "g / i / j / j", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: palette.error.main }}>
          Error loading data. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!kpiData || !productData || !transactionData) {
    return (
      <Box sx={{ gridArea: "g / i / j / j", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: palette.warning.main }}>
          No data available.
        </Typography>
      </Box>
    );
  }

  const tooltipStyle = {
    backgroundColor: palette.background.paper,
    border: `1px solid ${palette.divider}`,
    borderRadius: "4px",
    color: palette.text.primary,
  };

  return (
    <>
      {/* ========== PRODUCTS TABLE ========== */}
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
              backgroundColor: palette.background.paper,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: palette.background.default,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={productData || []}
            columns={productColumns}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
          />
        </Box>
      </DashboardBox>

      {/* ========== TRANSACTIONS TABLE ========== */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
              backgroundColor: palette.background.paper,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: palette.background.default,
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter
            rows={transactionData || []}
            columns={transactionColumns}
            getRowId={(row) => row._id}
            disableRowSelectionOnClick
          />
        </Box>
      </DashboardBox>

      {/* ========== EXPENSE BREAKDOWN PIE CHARTS ========== */}
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center" height="100%">
          {pieChartData.map((data, i) => (
            <Box key={`${data[0].name}-${i}`} sx={{ flex: 1, minWidth: "100px" }}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
              <Typography variant="h6" sx={{ fontSize: "0.875rem", mt: "0.5rem" }}>
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      {/* ========== OVERALL SUMMARY ========== */}
      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary and Insights" sideText="+15%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="45%"
          ></Box>
        </Box>
        <Typography margin="1rem" variant="h6" color={palette.grey[200]}>
          This quarter has shown consistent growth in both revenue and user
          activity. Operational costs remain stable, and marketing investments
          have begun to yield visible returns. Product diversification continues
          to strengthen the overall profit margin.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;