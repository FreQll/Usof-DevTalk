import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoriesService from "../../API/CategoriesService";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setCurrentPage, setIsFilters, setSearch, setSelectedCategory } from "../../store/postSlice";

const CategoryFilter = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const postsReducer = useSelector(selectPosts);

  useEffect(() => {
    CategoriesService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setCategory(postsReducer.filters?.selectedCategory ? postsReducer.filters.selectedCategory : "")
  }, [postsReducer.filters.selectedCategory]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    dispatch(setSelectedCategory(event.target.value));
    dispatch(setIsFilters(false));
    dispatch(setCurrentPage(1));
    dispatch(setSearch(""))
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Search By Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={category}
        label="Search By Category"
        onChange={handleChange}
      >
        <MenuItem value={""}>All</MenuItem>
        {categories.map((item) => (
          <MenuItem key={item.title} value={item.category_id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
