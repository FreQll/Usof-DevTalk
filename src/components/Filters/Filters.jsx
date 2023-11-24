import { Box, FormControlLabel, Grow, Paper, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import SortPostsBy from "./SortPostsBy";
import SortOrder from "./SortOrder";
import DatePick from "./DatePick";
import StatusFilter from "./StatusFilter";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { selectPosts, setFilters, setIsFilters } from "../../store/postSlice";

import "./Filters.css";

const Filters = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const postsReducer = useSelector(selectPosts);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    dispatch(setIsFilters(!postsReducer.isFilters));
    dispatch(
      setFilters({
        sortBy: "publish_date",
        sortOrder: "DESC",
        dateFrom: "",
        dateTo: "",
        statusFilter: "active",
        selectedCategory: "",
      })
    );
  };

  useEffect(() => {
    if (postsReducer.filters.selectedCategory || !postsReducer.isFilters) {
      setChecked(false);
    }
  }, [postsReducer.filters.selectedCategory, postsReducer.isFilters]);

  return (
    <Box>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Filters"
      />
      {checked && (
        <Grow in={checked}>
          <Paper>
            <div className="filters-paper-container">
              <div className="filters-item">
                <SortPostsBy className="sortsby-filter" />
                <SortOrder />
              </div>
              <div className="filters-item">
                <DatePick label={"From"} />
                <DatePick label={"To"} />
              </div>
              {user?.role === "admin" && (
                <div className="filters-item">
                  <StatusFilter />
                </div>
              )}
            </div>
          </Paper>
        </Grow>
      )}
    </Box>
  );
};

export default Filters;
