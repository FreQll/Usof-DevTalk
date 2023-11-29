import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";

const Links = () => {
  const user = useSelector(selectUser);

  return (
    <div className="navigation-links">
      <Link to="/">
        <Button variant="text">Posts</Button>
      </Link>
      {user && (
        <Link to="/posts/favorite">
          <Button variant="text">Favorite</Button>
        </Link>
      )}
      <Link to="/categories">
        <Button variant="text">Categories</Button>
      </Link>
      <Link to="/users">
        <Button variant="text">Users</Button>
      </Link>
    </div>
  );
};

export default Links;
