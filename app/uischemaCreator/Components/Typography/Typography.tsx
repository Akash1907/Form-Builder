import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function TypographyComponent({label, size}) {
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant={size} gutterBottom>
        {label}
      </Typography>
    </Box>
  );
}
