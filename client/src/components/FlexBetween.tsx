import { Box, BoxProps } from "@mui/material";
import { styled } from "@mui/system";

interface FlexBetweenProps extends BoxProps {
  gap?: string | number;
  vertical?: boolean;
  fullWidth?: boolean;
  wrap?: boolean;
}

const FlexBetween = styled(Box, {
  shouldForwardProp: (prop) => 
    !['gap', 'vertical', 'fullWidth', 'wrap'].includes(prop as string),
})<FlexBetweenProps>(({ theme, gap = 'normal', vertical = false, fullWidth = false, wrap = false }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: gap,
  flexDirection: vertical ? 'column' : 'row',
  width: fullWidth ? '100%' : 'auto',
  flexWrap: wrap ? 'wrap' : 'nowrap',

  // Responsive behavior
  [theme.breakpoints.down('sm')]: {
    flexDirection: vertical ? 'column' : 'row',
    gap: typeof gap === 'number' ? gap / 2 : gap,
  },
}));

export default FlexBetween;