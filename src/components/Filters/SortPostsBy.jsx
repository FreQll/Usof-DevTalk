import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setFilters } from "../../store/postSlice";

const SortPostsBy = () => {
  const [sortBy, setSortBy] = useState("publish_date");
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSortBy(event.target.value);
    dispatch(
      setFilters({
        sortBy: event.target.value,
        sortOrder: postsReducer.filters.sortOrder,
        dateFrom: postsReducer.filters.dateFrom,
        dateTo: postsReducer.filters.dateTo,
        statusFilter: postsReducer.filters.statusFilter,
      })
    );
  };

  return (
    <FormControl>
      <InputLabel>Sort By</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={sortBy}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value={"publish_date"}>Publish Date</MenuItem>
        <MenuItem value={"rating"}>Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortPostsBy;
