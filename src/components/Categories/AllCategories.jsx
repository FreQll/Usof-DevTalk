import { Box, Grid } from "@mui/material";
import React from "react";
import CategoriesItem from "./CategoriesItem";

const AllCategories = ({ categories }) => {
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container spacing={2}>
        {categories.map((category) => {
          return (
            <Grid key={category.category_id} item xs={12} sm={6} md={4} lg={3}>
              <CategoriesItem
                {...category}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AllCategories;
