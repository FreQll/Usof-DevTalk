import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeMode, setThemeMode } from "../../../store/themeSlice";

const ToggleThemeButton = () => {
  const [theme, setTheme] = useState("light");
  const themeReducer = useSelector(selectThemeMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    dispatch(setThemeMode(theme));
  };

  return (
    <div>
      <IconButton sx={{ ml: 1 }} onClick={handleToggle} color="inherit">
        {themeReducer === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
};

export default ToggleThemeButton;
