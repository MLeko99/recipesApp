import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2c3e50",
        color: "#ffffff",
        textAlign: "center",
        padding: "10px 0",
        width: "100%",
        position: "relative",
        bottom: 0,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Recipe App. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
