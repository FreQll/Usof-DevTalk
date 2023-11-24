import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./UserPhoto.css";

const UserPhoto = ({ login }) => {
  return (
    <Link to={`/user/${login}`}>
      <div className="user-photo-container">
        <Avatar
          alt={login}
          src={`http://localhost:3001/api/users/avatar/${login}.jpg`}
        />
        <Typography variant="body1">{login}</Typography>
      </div>
    </Link>
  );
};

export default UserPhoto;
