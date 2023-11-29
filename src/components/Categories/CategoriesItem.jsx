import { Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CategoriesItem = ({ category_id, title, description }) => {
  return (
    <Link to={`/?category=${category_id}`}>
      <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%" }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1" color={"grey"}>
          {description.length > 60
            ? description.slice(0, 100) + "..."
            : description}
        </Typography>
      </Paper>
    </Link>
  );
};

export default CategoriesItem;
