import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../../../store/themeSlice";

const Logo = () => {
  const theme = useSelector(selectThemeMode);

  return (
    <div className="logo">
      <Link to="/">
        {theme === "light" ? (
          <img
            src={`${process.env.PUBLIC_URL}/static/images/logo.png`}
            alt="DevTalk Logo"
            height={"50px"}
          />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/static/images/logoDark.png`}
            alt="DevTalk Logo"
            height={"50px"}
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
