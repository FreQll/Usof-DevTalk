import React from "react";
import "./Rating.css";
import { Typography } from "@mui/material";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";

const PostRating = ({ rating }) => {
  return (
    <div className="post-rating">
      <Typography variant="body1">Rating {rating}</Typography>
      <GradeOutlinedIcon />
    </div>
  );
};

export default PostRating;
