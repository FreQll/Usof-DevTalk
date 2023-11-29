import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

const LoginButton = () => {
  return (
    <Box sx={{ml: 1}}>
      <Link to="/login">
        <Button size="small" variant="outlined">Log In</Button>
      </Link>
    </Box>
  );
};

export default LoginButton;
