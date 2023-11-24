import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Container>
      <Typography variant="h2">Page Not Found</Typography>
      <Typography variant="h4">
        We're sorry, we couldn't find the page you requested.
      </Typography>
      <Typography variant="body1">
        But you can always browse for <Link to="/">other questions</Link>
      </Typography>
    </Container>
  );
};

export default PageNotFound;
