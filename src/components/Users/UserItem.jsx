import React from "react";
import { Link } from "react-router-dom";
import PostRating from "../Rating/PostRating";
import { Avatar, Chip, Paper, Typography } from "@mui/material";

const UserItem = ({ login, full_name, rating, role }) => {
  return (
    <Link to={`/user/${login}`}>
      <Paper elevation={3} sx={{ p: 3, width: "100%", height: "100%" }}>
        <Avatar
          alt={login}
          src={`http://localhost:3001/api/users/avatar/${login}.jpg`}
          sx={{ width: 64, height: 64, mb: 2 }}
        />
        <div className="user-info">
          <Typography variant="h6">{login}</Typography>
          <Chip label={role} />
        </div>
        <Typography variant="body2">{full_name}</Typography>
        <PostRating rating={rating} />
      </Paper>
    </Link>
  );
};

export default UserItem;
