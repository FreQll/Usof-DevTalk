import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setFilters } from "../../store/postSlice";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const SortOrder = () => {
  const [sortOrder, setSortOrder] = useState("DESC");
  const postsReducer = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilters({
        sortBy: postsReducer.filters.sortBy,
        sortOrder: sortOrder,
        dateFrom: postsReducer.filters.dateFrom,
        dateTo: postsReducer.filters.dateTo,
        statusFilter: postsReducer.filters.statusFilter,
      })
    );
  }, [
    sortOrder,
    dispatch,
    postsReducer.filters.sortBy,
    postsReducer.filters.dateFrom,
    postsReducer.filters.dateTo,
    postsReducer.filters.statusFilter,
  ]);

  return (
    <div>
      {sortOrder === "DESC" ? (
        <IconButton onClick={() => setSortOrder("ASC")}>
          <KeyboardArrowDownIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => setSortOrder("DESC")}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
};

export default SortOrder;
