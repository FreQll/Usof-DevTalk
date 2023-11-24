import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    filters: {
      sortBy: "publish_date",
      sortOrder: "DESC",
      dateFrom: "",
      dateTo: "",
      statusFilter: "active",
      selectedCategory: "",
      search: "",
    },
    currentPage: 1,
    totalPosts: 0,
    isFilters: false,
  },
  reducers: {
    resetToDefault: (state) => {
      state.filters = {
        sortBy: "publish_date",
        sortOrder: "DESC",
        dateFrom: "",
        dateTo: "",
        statusFilter: "active",
        selectedCategory: "",
      };
      state.currentPage = 1;
      state.totalPosts = 0;
      state.isFilters = false;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsFilters: (state, action) => {
      state.isFilters = action.payload;
    },
    setTotalPosts: (state, action) => {
      state.totalPosts = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.filters.sortOrder = action.payload;
    },
    setDateFrom: (state, action) => {
      state.filters.dateFrom = action.payload;
    },
    setDateTo: (state, action) => {
      state.filters.dateTo = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.filters.statusFilter = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.filters.selectedCategory = action.payload; // Set selectedCategory
    },
    setSearch(state, action) {
      state.filters.search = action.payload;
    },
  },
});

export const {
  setFilters,
  setCurrentPage,
  setTotalPosts,
  setSelectedCategory,
  setSortBy,
  setSortOrder,
  setDateFrom,
  setDateTo,
  setStatusFilter,
  setIsFilters,
  setSearch,
  resetToDefault,
} = postSlice.actions;
export const selectPosts = (state) => state.posts;
export default postSlice.reducer;
