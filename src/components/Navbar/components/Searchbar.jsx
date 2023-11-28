import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetToDefault,
  setIsFilters,
  setSearch,
} from "../../../store/postSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchValue(e.target.value);

    dispatch(resetToDefault());
    dispatch(setSearch(e.target.value));
    dispatch(setIsFilters(false));
  };

  const searchPost = () => {
    dispatch(resetToDefault());
    dispatch(setSearch(searchValue));
    dispatch(setIsFilters(false));

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchPost();
    }
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        inputProps={{ "aria-label": "Search..." }}
        onChange={(e) => {
          handleChange(e);
        }}
        value={searchValue}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={searchPost}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Searchbar;
