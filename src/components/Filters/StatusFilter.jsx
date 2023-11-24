import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setFilters } from "../../store/postSlice";

const StatusFilter = () => {
  const [activeFilter, setActiveFilter] = useState("active");
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setActiveFilter(event.target.value);
    dispatch(
      setFilters({
        sortBy: postsReducer.filters.sortBy,
        sortOrder: postsReducer.filters.sortOrder,
        dateFrom: postsReducer.filters.dateFrom,
        dateTo: postsReducer.filters.dateTo,
        statusFilter: event.target.value,
      })
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Status</InputLabel>
      <Select value={activeFilter} label="Status" onChange={handleChange}>
        <MenuItem value={"active"}>Active</MenuItem>
        <MenuItem value={"inactive"}>Inactive</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StatusFilter;
