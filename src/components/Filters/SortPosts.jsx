import { Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setCurrentPage, setFilters } from "../../store/postSlice";
import dayjs from "dayjs";

const SortPosts = () => {
  const [sortBy, setSortBy] = useState("publish_date");
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSortBy(event.target.value);
    let dateFrom;
    const dateTo = dayjs(new Date()).format("YYYY-MM-DD");
    if (event.target.value === "week") {
      dateFrom = dayjs(new Date().setDate(new Date().getDate() - 7)).format(
        "YYYY-MM-DD"
      );

      dispatch(
        setFilters({
          sortBy: event.target.value,
          sortOrder: postsReducer.filters.sortOrder,
          dateFrom: dateFrom,
          dateTo: dateTo,
          statusFilter: postsReducer.filters.statusFilter,
        })
      );
    } else if (event.target.value === "month") {
      dateFrom = dayjs(new Date().setDate(new Date().getDate() - 30)).format(
        "YYYY-MM-DD"
      );
      dispatch(
        setFilters({
          sortBy: event.target.value,
          sortOrder: postsReducer.filters.sortOrder,
          dateFrom: dateFrom,
          dateTo: dateTo,
          statusFilter: postsReducer.filters.statusFilter,
        })
      );
    } else {
      dispatch(
        setFilters({
          sortBy: event.target.value,
          sortOrder: postsReducer.filters.sortOrder,
          dateFrom: "",
          dateTo: "",
          statusFilter: postsReducer.filters.statusFilter,
        })
      );
    }
    dispatch(setCurrentPage(1));
  };

//   useEffect(() => {
//     if (postsReducer.filters.dateFrom !== "") {
//       setSortBy(null);
//     }
//   }, [postsReducer.filters.dateFrom]);

  return (
    <ToggleButtonGroup value={sortBy} onChange={handleChange} exclusive>
      <ToggleButton value="rating">By Rating</ToggleButton>
      <ToggleButton value="publish_date">By Date</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default SortPosts;
