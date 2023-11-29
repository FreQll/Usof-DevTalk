import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";

const Links = () => {
  return (
    <div className="navigation-links">
      <Link to="/">
        <Button variant="text">Posts</Button>
      </Link>
      <Link to="/posts/favorite">
        <Button variant="text">Favorite</Button>
      </Link>
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
