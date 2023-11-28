import React, { useEffect, useRef, useState } from "react";
import Logo from "./components/Logo";
import styles from "./Navbar.css";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Searchbar from "./components/Searchbar";
import UserMenu from "./components/UserMenu";
import LoginButton from "./components/LoginButton";
import ToggleThemeButton from "./components/ToggleThemeButton";
import { selectThemeMode } from "../../store/themeSlice";
import { Link } from "react-router-dom";
import HamburgerMenu from "./components/HamburgerMenu";

const Navbar = () => {
  const user = useSelector(selectUser);
  const theme = useSelector(selectThemeMode);
  //const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

    //setWindowWidth(window.innerWidth);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mb: "30px",
        position: "fixed",
        zIndex: "1000",
        bgcolor: "background.default",
        top: "0",
        left: "0",
        right: "0",
        boxShadow:
          theme === "light"
            ? "0px 2px 8px rgba(0,0,0,0.32)"
            : "0px 2px 8px rgba(255,255,255,0.12)",
        p: "10px",
      }}
      className={styles.navBar}
    >
      {windowWidth > 1040 ? (
        <div className="navigaton-links">
        <Logo />
        <Link to="/">
          <Typography variant="body1">Posts</Typography>
        </Link>
        <Link to="/posts/favorite">
          <Typography variant="body1">Favorite</Typography>
        </Link>
        <Link to="/categories">
          <Typography variant="body1">Categories</Typography>
        </Link>
        <Link to="/users">
          <Typography variant="body1">Users</Typography>
        </Link>
      </div>
      ) : (<HamburgerMenu />)}

      <Searchbar />
      <div className="flex-container">
        <ToggleThemeButton />
        {user ? <UserMenu /> : <LoginButton />}
      </div>
    </Box>
  );
};

export default Navbar;
