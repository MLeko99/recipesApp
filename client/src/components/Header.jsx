import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#3498db",
        width: "100%",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Recipe App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
