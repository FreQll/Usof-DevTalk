import React, { useEffect, useState } from "react";
import Logo from "./components/Logo";
import styles from "./Navbar.css";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Searchbar from "./components/Searchbar";
import UserMenu from "./components/UserMenu";
import LoginButton from "./components/LoginButton";
import ToggleThemeButton from "./components/ToggleThemeButton";
import { selectThemeMode } from "../../store/themeSlice";
import HamburgerMenu from "./components/HamburgerMenu";
import Links from "./components/Links";

const Navbar = () => {
  const user = useSelector(selectUser);
  const theme = useSelector(selectThemeMode);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
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
        <div className="navigation-left">
          <Logo />
          <Links />
        </div>
      ) : (
        <HamburgerMenu />
      )}

      <Searchbar />
      <div className="flex-container">
        <ToggleThemeButton />
        {user ? <UserMenu /> : <LoginButton />}
      </div>
    </Box>
  );
};

export default Navbar;
