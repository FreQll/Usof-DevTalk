import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoriesService from "../../API/CategoriesService";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, setCurrentPage, setIsFilters, setSearch, setSelectedCategory } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";
import useQuery from "../../Hooks/useQuery";

const CategoryFilter = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const postsReducer = useSelector(selectPosts);
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    CategoriesService.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      //setCategory(postsReducer.filters?.selectedCategory ? postsReducer.filters.selectedCategory : "")
      setCategory(query.get("category") || "All")
  }, [postsReducer.filters.selectedCategory, query]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    dispatch(setSelectedCategory(event.target.value));
    dispatch(setIsFilters(false));
    dispatch(setCurrentPage(1));
    dispatch(setSearch(""))
    console.log("Choice " + event.target.value)
    if (!event.target.value) {
      navigate(`/`)
      return
    }
    navigate(`/?category=${event.target.value}`)
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Search By Category</InputLabel>
      <Select
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
