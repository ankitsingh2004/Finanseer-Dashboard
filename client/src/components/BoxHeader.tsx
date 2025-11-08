import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";

type Props = {
  title: string;
  sideText: string;
  subtitle?: string;
  icon?: React.ReactNode;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  const { palette } = useTheme();
  return (
    <FlexBetween 
      color={palette.grey[400]} 
      margin="1.5rem 1rem 0 1rem"
      gap="1rem"
    >
      <FlexBetween gap="1rem">
        {icon}
        <Box flex="1">
          <Typography variant="h4" mb={subtitle ? "-0.1rem" : "0"}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" color={palette.grey[600]}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </FlexBetween>
      <Typography 
        variant="h5" 
        fontWeight="700" 
        color={palette.secondary[500]}
      >
        {sideText}
      </Typography>
    </FlexBetween>
  );
};

export default BoxHeader;