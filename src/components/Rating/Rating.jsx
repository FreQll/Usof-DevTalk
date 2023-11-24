import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React from "react";
import "./Rating.css";

const Rating = ({ rating, likeAction, dislikeAction, deleteLikeAction }) => {
  return (
    <div className="rating-container">
      <Tooltip title="Like" placement="top">
        <IconButton
          sx={{ rotate: "180deg" }}
          onClick={likeAction}
          color="primary"
        >
          <ArrowDropDownCircleOutlined />
        </IconButton>
      </Tooltip>

      <Typography variant="h5">{rating}</Typography>

      <Tooltip title="Dislike" placement="bottom">
        <IconButton onClick={dislikeAction} color="primary">
          <ArrowDropDownCircleOutlined />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete Like" placement="bottom">
        <IconButton onClick={deleteLikeAction} color="primary">
          <ReplayIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default Rating;
