import React from "react";
import "./Rating.css";
import { Typography } from "@mui/material";
//import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import StarRateIcon from '@mui/icons-material/StarRate';

const PostRating = ({ rating }) => {
  return (
    <div className="post-rating">
      <Typography variant="body1">Rating {rating}</Typography>
      <StarRateIcon sx={{mb: "4px", color: "orange"}}/>
    </div>
  );
};

export default PostRating;
