import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setFilters } from "../../store/postSlice";
import dayjs from "dayjs";

const DateFilter = () => {
  const [sortBy, setSortBy] = useState("publish_date");
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setSortBy(newValue);
    if (newValue === null) {
      dispatch(
        setFilters({
          sortBy: postsReducer.filters.sortBy,
          sortOrder: postsReducer.filters.sortOrder,
          dateFrom: "",
          dateTo: "",
          statusFilter: postsReducer.filters.statusFilter,
        })
      );
      return;
    }
    let dateFrom;
    const dateTo = dayjs(new Date()).format("YYYY-MM-DD");
    if (event.target.value === "week") {
      dateFrom = dayjs(new Date().setDate(new Date().getDate() - 7)).format(
        "YYYY-MM-DD"
      );
    }
    if (event.target.value === "month") {
      dateFrom = dayjs(new Date().setDate(new Date().getDate() - 30)).format(
        "YYYY-MM-DD"
      );
    }
    dispatch(
      setFilters({
        sortBy: postsReducer.filters.sortBy,
        sortOrder: postsReducer.filters.sortOrder,
        dateFrom: dateFrom,
        dateTo: dateTo,
        statusFilter: postsReducer.filters.statusFilter,
      })
    );
  };

  useEffect(() => {
    if (postsReducer.filters.dateFrom === "") {
      setSortBy(null);
    }
  }, [postsReducer.filters.dateFrom]);

  return (
    <ToggleButtonGroup value={sortBy} onChange={handleChange} exclusive>
      <ToggleButton value="week">Week</ToggleButton>
      <ToggleButton value="month">Month</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DateFilter;
