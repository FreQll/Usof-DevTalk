import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoriesService from "../../API/CategoriesService";

const CategoriesSelector = ({ category, handleChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesService.getAllCategories().then((response) => {
        console.log(response.data)
        setCategories(response.data);
    }).catch(error => {
        console.error(error)
    })
  }, []);

  const handleCategoryChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div>
      {categories && <FormControl fullWidth>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          multiple
          value={category}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Tooltip title={categories[value - 1].description}>
                  <Chip key={value} label={categories[value - 1].title} />
                </Tooltip>
              ))}
            </Box>
          )}
        >
          {categories && categories.map((item) => (
            <MenuItem key={item.title} value={item.category_id}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>}
    </div>
  );
};

export default CategoriesSelector;
