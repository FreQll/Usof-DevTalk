import { Chip } from "@mui/material";
import React from "react";

const CategoryChip = ({ title }) => {
  return (
    <Chip
      label={title}
      size="medium"
      sx={{ bgcolor: "#1BA3E5", color: "white" }}
    />
  );
};

export default CategoryChip;
