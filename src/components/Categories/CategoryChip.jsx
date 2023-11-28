import { Chip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CategoryChip = ({ title, id }) => {
  return (
    <Link to={`/?category=${id}`}>
      <Chip
        label={title}
        size="medium"
        sx={{ bgcolor: "#1BA3E5", color: "white" }}
      />
    </Link>
  );
};

export default CategoryChip;
