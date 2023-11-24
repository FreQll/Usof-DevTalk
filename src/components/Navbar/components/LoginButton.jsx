import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const LoginButton = () => {
  return (
    <Link to="/login">
      <Button variant="outlined">Log in</Button>
    </Link>
  );
};

export default LoginButton;
